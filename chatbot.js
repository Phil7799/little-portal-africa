// ============================================================
// LITTLE AFRICA SALES CHATBOT
// Uses Anthropic API to answer questions about the sales data
// ============================================================

(function() {
    let chatOpen = false;
    let chatHistory = [];
    let hasNewMessage = false;

    window.toggleChatbot = function() {
        chatOpen = !chatOpen;
        const panel = document.getElementById('chatbotPanel');
        const icon = document.getElementById('chatbotIcon');
        const badge = document.getElementById('chatbotBadge');
        if (panel) panel.style.display = chatOpen ? 'flex' : 'none';
        if (icon) icon.className = chatOpen ? 'fas fa-times' : 'fas fa-comments';
        if (badge && chatOpen) badge.style.display = 'none';
        if (chatOpen) {
            setTimeout(() => {
                const input = document.getElementById('chatbotInput');
                if (input) input.focus();
                scrollToBottom();
            }, 100);
        }
    };

    window.sendSuggestion = function(btn) {
        const text = btn.textContent;
        const input = document.getElementById('chatbotInput');
        if (input) {
            input.value = text;
            sendChatMessage();
        }
        // Hide suggestions after first use
        const suggestions = document.getElementById('chatbotSuggestions');
        if (suggestions) suggestions.style.display = 'none';
    };

    window.sendChatMessage = async function() {
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('chatSendBtn');
        if (!input) return;
        const message = input.value.trim();
        if (!message) return;

        input.value = '';
        input.disabled = true;
        if (sendBtn) sendBtn.disabled = true;

        // Hide suggestions after first message
        const suggestions = document.getElementById('chatbotSuggestions');
        if (suggestions) suggestions.style.display = 'none';

        // Append user message
        appendMessage('user', message);

        // Show typing indicator
        const typingId = appendTyping();

        // Build data context from dataManager
        const context = buildDataContext();

        // Add user turn to history
        chatHistory.push({ role: 'user', content: message });

        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1000,
                    system: `You are a helpful Sales Assistant for Little Africa, a ride-hailing company. You have access to the company's sales performance data and help users understand their metrics.

Here is the CURRENT sales data snapshot:
${context}

Guidelines:
- Answer questions about revenue, associates, onboarding, riding rates, targets, and performance trends
- Use the data provided to give specific, accurate answers with real numbers
- Format currency as "Ksh X" for Kenya data
- If asked about something not in the data, say so clearly
- Keep responses concise but informative
- Use bullet points or short paragraphs for clarity
- Be encouraging and professional
- If no data has been uploaded yet, inform the user they need to upload data first`,
                    messages: chatHistory.map(m => ({ role: m.role, content: m.content }))
                })
            });

            removeTyping(typingId);

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error?.message || `API error ${response.status}`);
            }

            const data = await response.json();
            const botReply = data.content?.map(c => c.text || '').join('') || 'Sorry, I couldn\'t process that.';

            // Add assistant reply to history
            chatHistory.push({ role: 'assistant', content: botReply });

            appendMessage('bot', botReply);

            // Notify if panel closed
            if (!chatOpen) {
                const badge = document.getElementById('chatbotBadge');
                if (badge) badge.style.display = 'flex';
            }

        } catch (err) {
            removeTyping(typingId);
            let errorMsg = '⚠️ Unable to connect to the AI. ';
            if (err.message && err.message.includes('401')) {
                errorMsg += 'API authentication issue.';
            } else if (err.message && err.message.includes('Failed to fetch')) {
                errorMsg += 'Network error — check your connection.';
            } else {
                errorMsg += err.message || 'Please try again.';
            }
            appendMessage('bot', errorMsg);
            // On error, remove the last user message from history so they can retry
            chatHistory.pop();
        } finally {
            input.disabled = false;
            if (sendBtn) sendBtn.disabled = false;
            input.focus();
        }
    };

    function buildDataContext() {
        if (typeof dataManager === 'undefined') return 'No data manager available.';

        try {
            const overview = dataManager.overviewData;
            if (!overview) return 'No data has been uploaded yet.';

            const associates = Object.values(overview.associatePerformance || {});
            const totalRevenue = associates.reduce((s, a) => s + a.totalRevenue, 0);
            const totalOnboarded = associates.reduce((s, a) => s + a.totalOnboarded, 0);
            const totalRiding = associates.reduce((s, a) => s + (a.totalRiding || 0), 0);
            const ridingRate = totalOnboarded > 0 ? ((totalRiding / totalOnboarded) * 100).toFixed(1) : 0;

            const teamTargets = dataManager.getDefaultTeamMonthlyTargets();
            const totalTarget = teamTargets.reduce((a, b) => a + b, 0);
            const targetAchievement = totalTarget > 0 ? ((totalRevenue / totalTarget) * 100).toFixed(1) : 0;

            const lastYearTotal = overview.lastYearComparison?.total || 0;
            const yoyGrowth = lastYearTotal > 0 ? (((totalRevenue - lastYearTotal) / lastYearTotal) * 100).toFixed(1) : 'N/A';

            let ctx = `=== OVERALL PERFORMANCE ===
Total Revenue Actual: Ksh ${totalRevenue.toLocaleString()}
Total Revenue Target: Ksh ${totalTarget.toLocaleString()}
Target Achievement: ${targetAchievement}%
Net Revenue (18%): Ksh ${(totalRevenue * 0.18).toLocaleString()}
Total Corporates Onboarded: ${totalOnboarded}
Total Corporates Riding: ${totalRiding}
Riding Rate: ${ridingRate}%
Last Year Total Revenue: Ksh ${lastYearTotal.toLocaleString()}
Year-over-Year Growth: ${yoyGrowth}%

=== MONTHLY TARGETS (KES) ===
${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => `${m}: Ksh ${(teamTargets[i] || 0).toLocaleString()}`).join(' | ')}

=== ASSOCIATE PERFORMANCE ===`;

            associates.forEach(a => {
                const avgAchievement = a.revenueAchievement.length > 0
                    ? (a.revenueAchievement.reduce((x, y) => x + y, 0) / a.revenueAchievement.length).toFixed(1)
                    : 0;
                ctx += `\n${a.name}:
  - Revenue: Ksh ${a.totalRevenue.toLocaleString()} (${avgAchievement}% avg achievement)
  - Net Revenue: Ksh ${(a.totalRevenue * 0.18).toLocaleString()}
  - Onboarded: ${a.totalOnboarded} | Riding: ${a.totalRiding || 0} | Riding Rate: ${(a.ridingRate || 0).toFixed(1)}%
  - Growth Rate: ${(a.growthRate || 0).toFixed(1)}%`;
            });

            // Top performer
            const topPerformer = [...associates].sort((a, b) => b.totalRevenue - a.totalRevenue)[0];
            if (topPerformer) {
                ctx += `\n\n=== TOP PERFORMER ===\n${topPerformer.name} with Ksh ${topPerformer.totalRevenue.toLocaleString()} revenue`;
            }

            // Weekly data summary
            const weeklyData = overview.weeklyPerformance || {};
            const weekNumbers = Object.keys(weeklyData).map(Number).sort((a, b) => a - b);
            if (weekNumbers.length > 0) {
                const latestWeek = weekNumbers[weekNumbers.length - 1];
                const latestData = weeklyData[latestWeek];
                ctx += `\n\n=== LATEST WEEK (Week ${latestWeek}, ${latestData?.date || 'N/A'}) ===
Actual: Ksh ${(latestData?.actual || 0).toLocaleString()}
Target: Ksh ${(latestData?.target || 0).toLocaleString()}
Last Year Same Week: Ksh ${(latestData?.lastYear || 0).toLocaleString()}
Total weeks with data: ${weekNumbers.length}`;
            }

            // Diaspora summary
            const diaspora = dataManager.diasporaData || [];
            if (diaspora.length > 0) {
                const countries = [...new Set(diaspora.map(d => d.country))];
                const totalDiasporaRevenue = diaspora.reduce((s, d) => s + d.totalRevenue, 0);
                ctx += `\n\n=== DIASPORA DATA ===
Countries: ${countries.join(', ')}
Total Diaspora Revenue (local currencies): ${totalDiasporaRevenue.toLocaleString()}
Note: Diaspora revenues are in local country currencies (ETB for Ethiopia, TZS for Tanzania, UGX for Uganda)`;
            }

            return ctx;
        } catch (e) {
            return 'Error reading data: ' + e.message;
        }
    }

    function appendMessage(role, text) {
        const container = document.getElementById('chatbotMessages');
        if (!container) return;

        const div = document.createElement('div');
        div.className = `chat-message ${role}`;

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';

        // Convert markdown-ish formatting
        const formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n- /g, '\n• ')
            .replace(/\n/g, '<br>');
        bubble.innerHTML = formatted;

        div.appendChild(bubble);
        container.appendChild(div);
        scrollToBottom();
    }

    function appendTyping() {
        const container = document.getElementById('chatbotMessages');
        if (!container) return null;
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.className = 'chat-message bot';
        div.id = id;
        div.innerHTML = `<div class="chat-bubble typing-bubble">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>`;
        container.appendChild(div);
        scrollToBottom();
        return id;
    }

    function removeTyping(id) {
        if (!id) return;
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function scrollToBottom() {
        const container = document.getElementById('chatbotMessages');
        if (container) container.scrollTop = container.scrollHeight;
    }

    // Allow Enter key in input
    document.addEventListener('DOMContentLoaded', function() {
        const input = document.getElementById('chatbotInput');
        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendChatMessage();
                }
            });
        }
    });
})();
<div id="lnl-success-modal" class="lnl-overlay" style="display:none;">
    <div class="lnl-modal-card">
        <div class="lnl-gold-bar"></div>
        <h2 class="lnl-title">ARCHITECTING YOUR GROWTH...</h2>
        <p class="lnl-subtext">The <strong>LNL Automation Engine</strong> has prioritized your inquiry. Your data is being analyzed against our industry benchmarks.</p>
        
        <div class="lnl-timeline">
            <div class="lnl-step">
                <span class="lnl-dot"></span>
                <p><strong>Step 1: Intake Analysis</strong><br>Reviewing your tech stack for immediate "leakage."</p>
            </div>
            <div class="lnl-step">
                <span class="lnl-dot"></span>
                <p><strong>Step 2: Auditor Assignment</strong><br>Preparing your custom 30-minute growth roadmap.</p>
            </div>
            <div class="lnl-step">
                <span class="lnl-dot"></span>
                <p><strong>Step 3: Priority Connection</strong><br>Check your inbox in < 10 mins for your booking link.</p>
            </div>
        </div>

        <button onclick="closeLNLModal()" class="lnl-btn">ACKNOWLEDGED</button>
    </div>
</div>







.lnl-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.95); display: flex; 
    justify-content: center; align-items: center; z-index: 9999;
}
.lnl-modal-card {
    background: #0a0a0a; border: 1px solid #333; padding: 40px;
    max-width: 500px; position: relative; text-align: left;
}
.lnl-gold-bar {
    position: absolute; top: 0; left: 0; width: 100%; height: 4px;
    background: #D4AF37;
}
.lnl-title { color: #D4AF37; font-size: 1.4rem; letter-spacing: 2px; margin-bottom: 10px; }
.lnl-subtext { color: #888; font-size: 0.9rem; margin-bottom: 25px; }
.lnl-timeline { margin-bottom: 25px; }
.lnl-step { display: flex; gap: 15px; margin-bottom: 20px; }
.lnl-dot { width: 8px; height: 8px; background: #D4AF37; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
.lnl-btn {
    background: #D4AF37; color: #000; border: none; padding: 15px;
    width: 100%; font-weight: bold; cursor: pointer; transition: 0.2s;
}
.lnl-btn:hover { opacity: 0.8; }
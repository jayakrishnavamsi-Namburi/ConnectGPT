import React from "react";
import "./ChatFooter.css";

function ChatFooter({ prompt, setPrompt, getReply }) {
    return (
        <div className="chatInput">
            <div className="inputBox">
                <input 
                    placeholder="Ask anything..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' ? getReply() : null}
                />
                <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
            </div>
            <p className="info">
                ConnectGPT can make mistakes. Check important info. See Cookie Preferences.
            </p>
        </div>
    )
}

export default ChatFooter;

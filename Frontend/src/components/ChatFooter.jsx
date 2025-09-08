import React, { useRef } from "react";
import "./ChatFooter.css";

function ChatFooter({ prompt, setPrompt, getReply }) {
    const inputRef = useRef(null);

    return (
        <div className="chatInput">
            <div className="inputBox">
                <input
                    ref={inputRef}
                    placeholder="Ask anything..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' ? getReply() : null}
                    onFocus={() => {
                        // Scroll input into view when keyboard opens (mobile)
                        setTimeout(() => {
                            inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                        }, 300);
                    }}
                />
                <div id="submit" onClick={getReply}>
                    <i className="fa-solid fa-paper-plane"></i>
                </div>
            </div>
            <p className="info">
                ConnectGPT can make mistakes. Check important info. See Cookie Preferences.
            </p>
        </div>
    )
}

export default ChatFooter;

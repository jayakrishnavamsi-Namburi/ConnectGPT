import "./Chat.css";
import React, { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../context/MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
    const { newChat, prevChats, reply } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);
    const bottomRef = useRef(null); // ← Ref to scroll into view

    useEffect(() => {
        if (reply === null) {
            setLatestReply(null);
            return;
        }

        if (!prevChats?.length) return;

        const content = reply.split(" "); // individual words
        let idx = 0;

        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx + 1).join(" "));
            idx++;
            if (idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);
    }, [prevChats, reply]);

    // Scroll to bottom smoothly whenever messages update
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [prevChats, latestReply]);

    return (
        <>
            {newChat && <h1 className="h1color">Start a New Chat!</h1>}
            <div className="chats">
                {prevChats?.slice(0, -1).map((chat, idx) => (
                    <div
                        className={chat.role === "user" ? "userDiv" : "gptDiv"}
                        key={idx}
                    >
                        {chat.role === "user" ? (
                            <p className="userMessage">{chat.content}</p>
                        ) : (
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {chat.content}
                            </ReactMarkdown>
                        )}
                    </div>
                ))}

                {prevChats?.length > 0 && (
                    <div className="gptDiv" key="latest">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {latestReply ?? prevChats[prevChats.length - 1].content}
                        </ReactMarkdown>
                    </div>
                )}

                {/* Bottom spacer to scroll into view */}
                <div ref={bottomRef}></div>
            </div>
        </>
    );
}

export default Chat;

package com.AML3A.Demo_WebSocket.model;

public class Message {
    private String sender;
    private String content;

    public Message() {}

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
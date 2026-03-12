import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const mockMessages = {
  1: [
    { id: 1, sender: 'them', text: "Hey! Are you attending the alumni gala this year?", time: "10:02 AM", status: 'read' },
    { id: 2, sender: 'me', text: "Yes, definitely! I already got my tickets. Are you going?", time: "10:05 AM", status: 'read' },
    { id: 3, sender: 'them', text: "Absolutely! It\'s going to be amazing. I heard they have a great keynote speaker this time.", time: "10:07 AM", status: 'read' },
    { id: 4, sender: 'me', text: "That\'s great to hear! Do you know who the speaker is?", time: "10:09 AM", status: 'read' },
    { id: 5, sender: 'them', text: "I think it's Dr. Amanda Foster from Stanford. She's been doing incredible work in AI ethics.", time: "10:12 AM", status: 'read' },
    { id: 6, sender: 'me', text: "Wow, that's impressive! Looking forward to it. Should we plan to meet up there?", time: "10:15 AM", status: 'read' },
    { id: 7, sender: 'them', text: "Hey! Are you attending the alumni gala this year?", time: "2:30 PM", status: 'delivered' },
    { id: 8, sender: 'them', text: "Just wanted to confirm our plans for the event!", time: "2:31 PM", status: 'delivered' },
  ],
  2: [
    { id: 1, sender: 'them', text: "Hey, I saw you referred me for the senior engineer role at your company!", time: "9:00 AM", status: 'read' },
    { id: 2, sender: 'me', text: "Of course! You\'d be a great fit. I spoke highly of your work.", time: "9:15 AM", status: 'read' },
    { id: 3, sender: 'them', text: "Thanks for the referral, really appreciate it!", time: "9:20 AM", status: 'read' },
  ],
  3: [
    { id: 1, sender: 'me', text: "Hi Priya! Great meeting you at the networking event last week.", time: "Mon 3:00 PM", status: 'read' },
    { id: 2, sender: 'them', text: "Same here! Your presentation on product design was really insightful.", time: "Mon 3:45 PM", status: 'read' },
    { id: 3, sender: 'them', text: "Let me know if you'd like to grab coffee next week.", time: "Mon 3:46 PM", status: 'delivered' },
  ],
};

export default function ChatWindow({ conversation, onBack }) {
  const [messages, setMessages] = useState(mockMessages?.[conversation?.id] || []);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMessages(mockMessages?.[conversation?.id] || []);
  }, [conversation?.id]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input?.trim()) return;
    setSending(true);
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: input?.trim(),
      time: new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending'
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => prev?.map(m => m?.id === newMsg?.id ? { ...m, status: 'delivered' } : m));
      setSending(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSend();
    }
  };

  if (!conversation) return null;

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--color-background)' }}>
      {/* Chat Header */}
      <div
        className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0"
        style={{
          background: 'var(--color-card)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <button
          onClick={onBack}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:opacity-70"
          style={{ background: 'var(--color-muted)', color: 'var(--color-text-secondary)' }}
          aria-label="Back to conversations"
        >
          <Icon name="ArrowLeft" size={16} color="currentColor" />
        </button>

        <div className="relative flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full overflow-hidden"
            style={{ border: '2px solid var(--color-border)' }}
          >
            <Image src={conversation?.avatar} alt={conversation?.avatarAlt} className="w-full h-full object-cover" />
          </div>
          {conversation?.online && (
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
              style={{ background: 'var(--color-success)', border: '2px solid var(--color-card)' }}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate" style={{ color: 'var(--color-foreground)' }}>
            {conversation?.name}
          </p>
          <p className="text-xs truncate" style={{ color: conversation?.online ? 'var(--color-success)' : 'var(--color-text-secondary)' }}>
            {conversation?.online ? '● Online' : conversation?.role}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {[
            { icon: 'Phone', label: 'Call' },
            { icon: 'Video', label: 'Video call' },
            { icon: 'MoreVertical', label: 'More options' },
          ]?.map(({ icon, label }) => (
            <button
              key={icon}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:opacity-70"
              style={{ color: 'var(--color-text-secondary)', background: 'transparent' }}
              aria-label={label}
            >
              <Icon name={icon} size={16} color="currentColor" />
            </button>
          ))}
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-2">
        <AnimatePresence initial={false}>
          {messages?.map((msg, idx) => {
            const isMe = msg?.sender === 'me';
            const prevMsg = messages?.[idx - 1];
            const nextMsg = messages?.[idx + 1];
            const isFirstInGroup = !prevMsg || prevMsg?.sender !== msg?.sender;
            const isLastInGroup = !nextMsg || nextMsg?.sender !== msg?.sender;
            const showAvatar = !isMe && isLastInGroup;

            return (
              <motion.div
                key={msg?.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'} ${isFirstInGroup && idx > 0 ? 'mt-4' : ''}`}
              >
                {/* Avatar placeholder for alignment */}
                {!isMe && (
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                    {showAvatar ? (
                      <Image src={conversation?.avatar} alt={conversation?.avatarAlt} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                )}
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[68%] lg:max-w-[58%]`}>
                  <div
                    className="px-4 py-2.5 text-sm leading-relaxed"
                    style={{
                      background: isMe ? 'var(--color-primary)' : 'var(--color-card)',
                      color: isMe ? 'var(--color-primary-foreground)' : 'var(--color-foreground)',
                      border: isMe ? 'none' : '1px solid var(--color-border)',
                      borderRadius: isMe
                        ? (isFirstInGroup ? '18px 18px 4px 18px' : isLastInGroup ? '18px 4px 18px 18px' : '18px 4px 4px 18px')
                        : (isFirstInGroup ? '18px 18px 18px 4px' : isLastInGroup ? '4px 18px 18px 18px' : '4px 18px 18px 4px'),
                      boxShadow: isMe ? 'none' : 'var(--shadow-sm)'
                    }}
                  >
                    {msg?.text}
                  </div>

                  {isLastInGroup && (
                    <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{msg?.time}</span>
                      {isMe && (
                        <Icon
                          name={msg?.status === 'sending' ? 'Clock' : msg?.status === 'delivered' ? 'Check' : 'CheckCheck'}
                          size={11}
                          color={msg?.status === 'read' ? 'var(--color-accent)' : 'var(--color-text-secondary)'}
                        />
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
      {/* Composer */}
      <div
        className="flex-shrink-0 px-5 py-4"
        style={{
          background: 'var(--color-card)',
          borderTop: '1px solid var(--color-border)'
        }}
      >
        <div
          className="flex items-end gap-2 rounded-2xl px-4 py-3"
          style={{
            background: 'var(--color-muted)',
            border: '1px solid var(--color-border)'
          }}
        >
          {/* Attach */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowAttachMenu(v => !v)}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200 hover:opacity-70 mb-0.5"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="Attach file"
            >
              <Icon name="Paperclip" size={15} color="currentColor" />
            </button>
            {showAttachMenu && (
              <div
                className="absolute bottom-10 left-0 rounded-xl overflow-hidden"
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 20
                }}
              >
                {[
                  { icon: 'Image', label: 'Photo' },
                  { icon: 'FileText', label: 'Document' },
                  { icon: 'Link', label: 'Link' },
                ]?.map(item => (
                  <button
                    key={item?.label}
                    onClick={() => setShowAttachMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm transition-all hover:opacity-70"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <Icon name={item?.icon} size={14} color="currentColor" />
                    {item?.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Text Input */}
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e?.target?.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-transparent text-sm outline-none border-none resize-none max-h-28 py-0.5"
            style={{
              color: 'var(--color-foreground)',
              lineHeight: '1.55'
            }}
          />

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={!input?.trim() || sending}
            className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200 flex-shrink-0 disabled:opacity-35 hover:opacity-85 active:scale-95 mb-0.5"
            style={{
              background: input?.trim() ? 'var(--color-primary)' : 'var(--color-border)',
              color: 'var(--color-primary-foreground)'
            }}
            aria-label="Send message"
          >
            <Icon name="Send" size={13} color={input?.trim() ? 'var(--color-primary-foreground)' : 'var(--color-text-secondary)'} />
          </button>
        </div>

        <p className="text-xs text-center mt-2" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
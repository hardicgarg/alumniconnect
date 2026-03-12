import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from 'components/ui/Header';
import ConversationList, { conversations } from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import EmptyState from './components/EmptyState';
import NewMessageModal from './components/NewMessageModal';

export default function MessagingInterface() {
  const [activeId, setActiveId] = useState(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [mobileView, setMobileView] = useState('list');
  const [convList, setConvList] = useState(conversations);

  const activeConversation = convList?.find(c => c?.id === activeId) || null;

  const handleSelectConversation = (id) => {
    setActiveId(id);
    setMobileView('chat');
  };

  const handleBack = () => {
    setMobileView('list');
    setActiveId(null);
  };

  const handleStartConversation = (alumni, message) => {
    const existing = convList?.find(c => c?.id === alumni?.id);
    if (existing) {
      setActiveId(existing?.id);
    } else {
      const newConv = {
        id: alumni?.id,
        name: alumni?.name,
        avatar: alumni?.avatar,
        avatarAlt: alumni?.avatarAlt,
        preview: message,
        timestamp: 'Just now',
        unread: 0,
        online: false,
        role: alumni?.role
      };
      setConvList(prev => [newConv, ...prev]);
      setActiveId(alumni?.id);
    }
    setMobileView('chat');
  };

  return (
    <div className="flex flex-col" style={{ height: '100vh', background: 'var(--color-background)' }}>
      <Header />
      {/* Main Content */}
      <div
        className="flex flex-1 overflow-hidden"
        style={{ height: 'calc(100vh - var(--nav-height))' }}
      >
        {/* Conversation List Panel */}
        <div
          className={`
            flex-shrink-0 w-full lg:w-[340px] xl:w-[380px] h-full
            ${mobileView === 'list' ? 'flex' : 'hidden'} lg:flex flex-col
          `}
          style={{ borderRight: '1px solid var(--color-border)' }}
        >
          <ConversationList
            activeId={activeId}
            onSelect={handleSelectConversation}
            onNewMessage={() => setShowNewMessage(true)}
          />
        </div>

        {/* Chat Panel */}
        <div
          className={`
            flex-1 h-full min-w-0
            ${mobileView === 'chat' ? 'flex' : 'hidden'} lg:flex flex-col
          `}
        >
          <AnimatePresence mode="wait">
            {activeConversation ? (
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col h-full"
              >
                <ChatWindow
                  conversation={activeConversation}
                  onBack={handleBack}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="flex-1 h-full hidden lg:flex"
              >
                <EmptyState onNewMessage={() => setShowNewMessage(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {showNewMessage && (
        <NewMessageModal
          onClose={() => setShowNewMessage(false)}
          onStartConversation={handleStartConversation}
        />
      )}
    </div>
  );
}
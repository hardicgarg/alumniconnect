import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const searchableAlumni = [
{ id: 10, name: "Rachel Green", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_118b236b8-1772642991917.png", avatarAlt: "Blonde woman in professional blazer smiling in bright office", role: "Attorney at Sullivan & Cromwell", batch: "Class of 2014" },
{ id: 11, name: "Nathan Scott", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15f496ada-1772852523596.png", avatarAlt: "Young man with dark hair in casual business attire outdoors", role: "Architect at Gensler", batch: "Class of 2016" },
{ id: 12, name: "Olivia Park", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_120f980d1-1763300650373.png", avatarAlt: "Asian woman with glasses in modern tech office environment", role: "Data Engineer at Airbnb", batch: "Class of 2018" },
{ id: 13, name: "Marcus Johnson", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ffe872cd-1763294679798.png", avatarAlt: "Black man in formal suit with confident professional expression", role: "Financial Analyst at JPMorgan", batch: "Class of 2015" },
{ id: 14, name: "Sofia Martinez", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e4b58217-1763296801823.png", avatarAlt: "Hispanic woman with dark hair in creative studio workspace", role: "Brand Designer at Adobe", batch: "Class of 2017" }];


export default function NewMessageModal({ onClose, onStartConversation }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');

  const filtered = query?.trim() ?
  searchableAlumni?.filter((a) =>
  a?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
  a?.role?.toLowerCase()?.includes(query?.toLowerCase())
  ) :
  searchableAlumni;

  const handleSend = () => {
    if (!selected || !message?.trim()) return;
    onStartConversation(selected, message?.trim());
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
        style={{ background: 'rgba(28,28,28,0.5)' }}
        onClick={(e) => e?.target === e?.currentTarget && onClose()}>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25 }}
          className="bg-card rounded-2xl border border-border w-full max-w-md overflow-hidden"
          style={{ boxShadow: 'var(--shadow-xl)' }}>
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-heading font-semibold text-base text-foreground">New Message</h3>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-all text-text-secondary hover:text-foreground">
              <Icon name="X" size={16} color="currentColor" />
            </button>
          </div>

          {/* Search */}
          <div className="px-5 py-3 border-b border-border">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 h-9 border border-border">
              <Icon name="Search" size={14} color="var(--color-text-secondary)" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e?.target?.value)}
                placeholder="Search alumni by name or role..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-text-secondary outline-none border-none"
                autoFocus />
              
            </div>
          </div>

          {/* Alumni List */}
          <div className="max-h-52 overflow-y-auto">
            {filtered?.map((alumni) =>
            <button
              key={alumni?.id}
              onClick={() => setSelected(alumni)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all duration-200 hover:bg-muted border-b border-border/50 ${selected?.id === alumni?.id ? 'bg-muted' : ''}`}>
              
                <div className="w-9 h-9 rounded-full overflow-hidden border border-border flex-shrink-0">
                  <Image src={alumni?.avatar} alt={alumni?.avatarAlt} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{alumni?.name}</p>
                  <p className="text-xs text-text-secondary truncate">{alumni?.role} · {alumni?.batch}</p>
                </div>
                {selected?.id === alumni?.id &&
              <Icon name="CheckCircle" size={16} color="var(--color-accent)" />
              }
              </button>
            )}
          </div>

          {/* Message Input */}
          {selected &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="px-5 py-3 border-t border-border">
            
              <p className="text-xs text-text-secondary mb-2">Message to <span className="font-medium text-foreground">{selected?.name}</span></p>
              <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              placeholder="Write your message..."
              rows={3}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-text-secondary outline-none resize-none focus:border-ring transition-all" />
            
            </motion.div>
          }

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border">
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-foreground hover:bg-muted transition-all">
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={!selected || !message?.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-250 disabled:opacity-40"
              style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
              
              <Icon name="Send" size={14} color="currentColor" />
              Send Message
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

}
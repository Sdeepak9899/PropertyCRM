'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Send, Search } from 'lucide-react'

const mockConversations = [
  {
    id: '1',
    participant: 'John Smith',
    email: 'john@example.com',
    lastMessage: 'Interested in the downtown penthouse',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: true,
  },
  {
    id: '2',
    participant: 'Sarah Johnson',
    email: 'sarah@example.com',
    lastMessage: 'When can we schedule a viewing?',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unread: false,
  },
  {
    id: '3',
    participant: 'Michael Chen',
    email: 'michael@example.com',
    lastMessage: 'Thanks for the property recommendations',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    unread: false,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messageText, setMessageText] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('')
      // API call would go here
    }
  }

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6 p-6">
      {/* Conversations Sidebar */}
      <div className="w-80 flex flex-col space-y-4">
        <div className="flex gap-2">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedConversation.id === conversation.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'hover:bg-secondary border-border'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{conversation.participant}</p>
                  <p className="text-xs opacity-75 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread && (
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0 mt-1"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat View */}
      {selectedConversation && (
        <div className="flex-1 flex flex-col bg-card rounded-lg border border-border">
          {/* Header */}
          <div className="border-b border-border p-4">
            <p className="font-semibold text-foreground">{selectedConversation.participant}</p>
            <p className="text-sm text-muted-foreground">{selectedConversation.email}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg p-3 max-w-xs">
                <p className="text-sm text-foreground">
                  {selectedConversation.lastMessage}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedConversation.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                <p className="text-sm">Thanks for reaching out! Let me know your availability.</p>
                <p className="text-xs opacity-75 mt-1">2:30 PM</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-3">
              <Textarea
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="resize-none"
                rows={2}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

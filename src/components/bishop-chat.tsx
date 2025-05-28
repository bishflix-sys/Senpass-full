
'use client';

import * as React from 'react';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique keys

import { askBishop } from '@/ai/flows/bishop-chat-flow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_GREETING_ID = 'bishop-initial-greeting';

export default function BishopChat() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: INITIAL_GREETING_ID,
      role: 'assistant',
      content: "Bonjour ! Je suis BISHOP. Posez-moi une question sur la plateforme SenPass."
    }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages update
  React.useEffect(() => {
    if (scrollAreaRef.current) {
       const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
       if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
       }
    }
  }, [messages]);

  // Auto-focus input when chat becomes visible (e.g., sheet opens)
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Runs once on mount when the component (and thus the sheet content) is rendered

  const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault(); // Prevent form submission if used within a form
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = { id: uuidv4(), role: 'user', content: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askBishop({ message: trimmedInput });
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Bishop AI:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur de Communication',
        description: "Impossible de joindre l'assistant BISHOP pour le moment.",
      });
       setMessages((prev) => [
           ...prev,
           { id: uuidv4(), role: 'assistant', content: "Désolé, je n'ai pas pu traiter votre demande." }
       ]);
    } finally {
      setIsLoading(false);
      // Re-focus input after sending message for better UX
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-card">
      <CardHeader className="flex flex-row items-center gap-3 border-b pb-4 flex-shrink-0">
         <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
         </Avatar>
        <div>
            <CardTitle className="text-lg font-semibold text-primary">BISHOP</CardTitle>
            <CardDescription>Votre assistant IA pour SenPass</CardDescription>
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow w-full p-4" ref={scrollAreaRef}>
          <div className="space-y-6 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 flex-shrink-0 border">
                     <AvatarFallback className="bg-secondary text-secondary-foreground"><Bot size={16} /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[75%] rounded-lg px-4 py-2 text-sm shadow-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {message.content.split('\n').map((line, i) => (
                     <p key={i}>{line}</p>
                  ))}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8 flex-shrink-0 border">
                     <AvatarFallback className="bg-accent text-accent-foreground"><User size={16} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center justify-start gap-3">
                 <Avatar className="h-8 w-8 flex-shrink-0 border">
                    <AvatarFallback className="bg-secondary text-secondary-foreground"><Bot size={16} /></AvatarFallback>
                 </Avatar>
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-3 text-sm shadow-sm flex items-center space-x-2">
                   <Loader2 className="h-4 w-4 animate-spin" />
                   <span>BISHOP réfléchit...</span>
                </div>
              </div>
            )}
          </div>
      </ScrollArea>
      <CardFooter className="border-t p-4 flex-shrink-0">
         <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            <Input
              ref={inputRef} // Assign ref to input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez votre question à BISHOP..."
              disabled={isLoading}
              className="flex-1"
              aria-label="Message input"
            />
            <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
               {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Envoyer</span>
            </Button>
         </form>
      </CardFooter>
    </div>
  );
}

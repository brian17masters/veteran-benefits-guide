
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X } from "lucide-react";
import ChatMessage, { MessageType } from "./ChatMessage";

export type FinancialInfo = {
  currentIncome?: string;
  expectedPension?: string;
  disabilityPayment?: string;
  monthlyExpenses?: string;
  savings?: string;
};

interface FinancialChatbotProps {
  onInfoCollected: (info: FinancialInfo) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FinancialChatbot: React.FC<FinancialChatbotProps> = ({
  onInfoCollected,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [collectedInfo, setCollectedInfo] = useState<FinancialInfo>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = [
    "What is your current monthly income?",
    "What is your expected monthly pension amount?",
    "What is your monthly disability payment amount?",
    "What are your total monthly expenses?",
    "How much do you currently have in savings?"
  ];

  const infoKeys: (keyof FinancialInfo)[] = [
    "currentIncome",
    "expectedPension",
    "disabilityPayment",
    "monthlyExpenses",
    "savings"
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Hi there! I'm here to help you with your financial planning. Let's start with a few questions.");
      setTimeout(() => {
        addBotMessage(questions[currentQuestion]);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text: string) => {
    const newMessage: MessageType = {
      text,
      isUser: false,
      id: Date.now().toString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: MessageType = {
      text,
      isUser: true,
      id: Date.now().toString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    addUserMessage(currentMessage);
    
    // Save the answer to the current question
    const updatedInfo = { ...collectedInfo };
    updatedInfo[infoKeys[currentQuestion]] = currentMessage;
    setCollectedInfo(updatedInfo);
    
    setCurrentMessage("");
    
    // Move to next question or finish
    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      
      setTimeout(() => {
        addBotMessage(questions[nextQuestion]);
      }, 500);
    } else {
      // All questions answered
      setTimeout(() => {
        addBotMessage("Thank you for providing all the information! I'll update your financial plan now.");
        
        // Pass the collected info back to the parent component
        onInfoCollected(updatedInfo);
        
        // Close chatbot after a delay
        setTimeout(() => {
          onClose();
        }, 2000);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 md:w-96 shadow-lg">
        <CardHeader className="py-3 flex flex-row items-center justify-between">
          <CardTitle className="text-md flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Financial Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="max-h-[300px] overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        
        <CardFooter className="p-3 border-t">
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="Type your answer..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FinancialChatbot;

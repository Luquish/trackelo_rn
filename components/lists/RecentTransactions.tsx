import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'investment';
  title: string;
  amount: number;
  date: string;
  category?: string;
  description?: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  formatValue: (amount: number) => string;
}

export default function RecentTransactions({ 
  transactions, 
  formatValue
}: RecentTransactionsProps) {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return { name: 'arrow-down-circle' as const, color: '#4ade80' };
      case 'expense':
        return { name: 'arrow-up-circle' as const, color: '#f87171' };
      case 'investment':
        return { name: 'trending-up' as const, color: '#60a5fa' };
      default:
        return { name: 'help-circle' as const, color: '#a0a0a0' };
    }
  };

  const getTransactionTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return 'Ingreso';
      case 'expense':
        return 'Gasto';
      case 'investment':
        return 'Inversión';
      default:
        return 'Transacción';
    }
  };

  return (
    <Card elevate padding="$4" backgroundColor="#1a1a1a" borderColor="#2a2a2a" borderWidth={1}>
      <YStack space="$3">
        <XStack alignItems="center" space="$2">
          <Ionicons name="time" size={24} color="#667eea" />
          <Text fontSize="$6" fontWeight="600" color="#ffffff">
            Transacciones Recientes
          </Text>
        </XStack>
        <Text fontSize="$4" color="#a0a0a0">
          Tus últimos movimientos financieros
        </Text>
        
        <YStack space="$2">
          {transactions.map((transaction) => {
            const icon = getTransactionIcon(transaction.type);
            const typeLabel = getTransactionTypeLabel(transaction.type);
            
            return (
              <XStack 
                key={transaction.id} 
                justifyContent="space-between" 
                alignItems="center"
                paddingVertical="$2"
              >
                <XStack space="$3" alignItems="center" flex={1}>
                  <YStack
                    backgroundColor={`${icon.color}20`}
                    borderRadius="$10"
                    padding="$2"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Ionicons name={icon.name} size={20} color={icon.color} />
                  </YStack>
                  
                  <YStack flex={1} space="$1">
                    <Text fontSize="$4" fontWeight="600" color="#ffffff">
                      {transaction.title}
                    </Text>
                    <XStack alignItems="center" space="$2">
                      <Text fontSize="$3" color="#a0a0a0">
                        {typeLabel}
                      </Text>
                      {transaction.category && (
                        <>
                          <Text fontSize="$3" color="#a0a0a0">•</Text>
                          <Text fontSize="$3" color="#a0a0a0">
                            {transaction.category}
                          </Text>
                        </>
                      )}
                    </XStack>
                    <Text fontSize="$3" color="#666666">
                      {transaction.date}
                    </Text>
                  </YStack>
                </XStack>
                
                <YStack alignItems="flex-end" space="$1">
                  <Text 
                    fontSize="$4" 
                    fontWeight="600" 
                    color={transaction.type === 'expense' ? '#f87171' : '#4ade80'}
                  >
                    {transaction.type === 'expense' ? '-' : '+'}{formatValue(transaction.amount)}
                  </Text>
                </YStack>
              </XStack>
            );
          })}
        </YStack>
        
        {transactions.length === 0 && (
          <YStack alignItems="center" paddingVertical="$4" space="$2">
            <Ionicons name="receipt-outline" size={48} color="#666666" />
            <Text fontSize="$4" color="#666666" textAlign="center">
              No hay transacciones recientes
            </Text>
            <Text fontSize="$3" color="#666666" textAlign="center">
              Tus movimientos aparecerán aquí
            </Text>
          </YStack>
        )}
      </YStack>
    </Card>
  );
}

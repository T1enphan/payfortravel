'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { AddMember } from '@/components/expense/AddMember';
import { AddExpense } from '@/components/expense/AddExpense';
import { ExpenseList } from '@/components/expense/ExpenseList';
import { Settlement } from '@/components/expense/Settlement';

interface Expense {
  payer: string;
  amount: number;
  description: string;
  dateTime: string;
}

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export default function ExpensePage() {
  const [members, setMembers] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  // Load dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const savedMembers = localStorage.getItem('expenseMembers');
    const savedExpenses = localStorage.getItem('expenseList');
    
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    }
    
    if (savedExpenses) {
      const parsedExpenses = JSON.parse(savedExpenses);
      setExpenses(parsedExpenses);
      calculateSettlements(parsedExpenses, JSON.parse(savedMembers || '[]'));
    }
  }, []);

  // Lưu members vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('expenseMembers', JSON.stringify(members));
  }, [members]);

  // Lưu expenses vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('expenseList', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddMember = (name: string) => {
    if (!members.includes(name)) {
      setMembers([...members, name]);
    }
  };

  const handleAddExpense = (payer: string, amount: number, description: string, dateTime: string) => {
    const newExpenses = [...expenses, { payer, amount, description, dateTime }];
    setExpenses(newExpenses);
    calculateSettlements(newExpenses, members);
  };

  const calculateSettlements = (currentExpenses: Expense[], currentMembers: string[]) => {
    if (currentMembers.length === 0 || currentExpenses.length === 0) {
      setSettlements([]);
      return;
    }

    // Tính tổng chi tiêu của mỗi người
    const memberExpenses = new Map<string, number>();
    currentMembers.forEach(member => memberExpenses.set(member, 0));
    
    currentExpenses.forEach(expense => {
      const current = memberExpenses.get(expense.payer) || 0;
      memberExpenses.set(expense.payer, current + expense.amount);
    });

    // Tính tổng chi tiêu trung bình
    const totalExpense = Array.from(memberExpenses.values()).reduce((a, b) => a + b, 0);
    const averageExpense = totalExpense / currentMembers.length;

    // Tính toán ai phải trả cho ai
    const newSettlements: Settlement[] = [];
    const balances = new Map<string, number>();

    // Tính số dư của mỗi người
    currentMembers.forEach(member => {
      const balance = (memberExpenses.get(member) || 0) - averageExpense;
      balances.set(member, balance);
    });

    // Tìm người cần trả và người cần nhận
    const debtors = Array.from(balances.entries())
      .filter(([_, balance]) => balance < 0)
      .sort((a, b) => a[1] - b[1]);

    const creditors = Array.from(balances.entries())
      .filter(([_, balance]) => balance > 0)
      .sort((a, b) => b[1] - a[1]);

    // Tính toán các khoản thanh toán
    let debtorIndex = 0;
    let creditorIndex = 0;

    while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
      const [debtor, debtorBalance] = debtors[debtorIndex];
      const [creditor, creditorBalance] = creditors[creditorIndex];

      const amount = Math.min(Math.abs(debtorBalance), creditorBalance);

      if (amount > 0) {
        newSettlements.push({
          from: debtor,
          to: creditor,
          amount: amount
        });
      }

      if (Math.abs(debtorBalance) <= creditorBalance) {
        debtorIndex++;
      } else {
        creditorIndex++;
      }
    }

    setSettlements(newSettlements);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tính chi tiêu nhóm
        </Typography>
        
        <AddMember onAddMember={handleAddMember} />
        
        {members.length > 0 && (
          <>
            <AddExpense members={members} onAddExpense={handleAddExpense} />
            <ExpenseList expenses={expenses} members={members} />
            {settlements.length > 0 && <Settlement settlements={settlements} />}
          </>
        )}
      </Box>
    </Container>
  );
} 
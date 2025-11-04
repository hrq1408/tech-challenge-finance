import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './index';

const meta = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de card para agrupar conteúdo relacionado. Suporta classes customizadas para estilização adicional.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
    },
    children: {
      description: 'Conteúdo do card',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>
          Título do Card
        </h3>
        <p style={{ color: '#666' }}>
          Este é um exemplo de conteúdo dentro de um card. O card fornece uma
          estrutura visual consistente para agrupar informações relacionadas.
        </p>
      </div>
    ),
  },
};

export const WithCustomStyling: Story = {
  args: {
    className: 'bg-primary text-white',
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>
          Card com Estilo Customizado
        </h3>
        <p>
          Este card usa classes customizadas para alterar a cor de fundo e texto.
        </p>
      </div>
    ),
  },
};

export const TransactionCard: Story = {
  args: {
    children: (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Saldo da Conta</h3>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#388E3C' }}>
            R$ 1.000,00
          </p>
        </div>
        <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: '12px' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Última atualização: hoje às 10:30
          </p>
        </div>
      </div>
    ),
  },
};



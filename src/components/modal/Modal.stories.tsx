import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '@/layout/modal';
import { Button } from '../button/index';

// Mock function for actions
const fn = () => {};

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de modal para exibir conteúdo em overlay. Suporta fechar ao clicar fora ou no botão de fechar.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controla se o modal está aberto',
    },
    onClose: {
      action: 'closed',
      description: 'Função chamada quando o modal é fechado',
    },
    children: {
      description: 'Conteúdo do modal',
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold' }}>
          Exemplo de Modal
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Este é um exemplo de conteúdo dentro do modal.
        </p>
        <Button onClick={() => setIsOpen(false)}>Fechar</Button>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
};

export const WithContent: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal com Conteúdo</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>
              Detalhes da Transação
            </h2>
            <div style={{ marginBottom: '12px' }}>
              <strong>Descrição:</strong> Salário
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Tipo:</strong> Receita
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong>Valor:</strong> R$ 1.500,00
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Fechar
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Confirmar
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};


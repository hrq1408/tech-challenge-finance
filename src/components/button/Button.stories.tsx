import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

// Mock function for actions
const fn = () => {};

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de botão reutilizável com diferentes variantes (primary, secondary, outline, error).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'error'],
      description: 'Variante visual do botão',
    },
    children: {
      control: 'text',
      description: 'Conteúdo do botão',
    },
    onClick: { action: 'clicked' },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Primário',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Botão Outline',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Desabilitado',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: '➕ Adicionar',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Deletar',
  },
};


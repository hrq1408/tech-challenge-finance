import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './index';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de input de texto com suporte a label opcional. Estilizado com o design system do projeto.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label do input',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
      description: 'Tipo do input',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o input',
    },
    required: {
      control: 'boolean',
      description: 'Campo obrigatório',
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Digite aqui...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome',
  },
};

export const Email: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'seu@email.com',
  },
};

export const Password: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: 'Digite sua senha',
  },
};

export const Number: Story = {
  args: {
    label: 'Valor',
    type: 'number',
    placeholder: '0,00',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo Desabilitado',
    placeholder: 'Não é possível editar',
    disabled: true,
    value: 'Valor fixo',
  },
};

export const Required: Story = {
  args: {
    label: 'Campo Obrigatório',
    placeholder: 'Digite aqui...',
    required: true,
  },
};


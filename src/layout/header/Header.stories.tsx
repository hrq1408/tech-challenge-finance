import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './index';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Cabeçalho da aplicação com navegação principal. Usa a cor primária do design system.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <p>Conteúdo da página abaixo do header</p>
      </div>
    </div>
  ),
};



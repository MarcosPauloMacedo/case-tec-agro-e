// TableProducts.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableProducts } from './table';
import type { Product } from '../../../types/product';

describe('TableProducts', () => {
  const mockProducts: Product[] = [
    { id: 1, name: 'Produto A', price: 100 },
    { id: 2, name: 'Produto B', price: 200 },
  ];

  it('deve renderizar a tabela com produtos corretamente', () => {
    render(<TableProducts products={mockProducts} />);

    // Verifica o cabeçalho
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Preço')).toBeInTheDocument();

    // Verifica os produtos
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Produto A')).toBeInTheDocument();
    expect(screen.getByText('R$ 100')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Produto B')).toBeInTheDocument();
    expect(screen.getByText('R$ 200')).toBeInTheDocument();
  });

  it('deve renderizar conteúdo adicional se a função render for passada', () => {
    render(
      <TableProducts
        products={mockProducts}
        render={(product) => <button>Editar {product.name}</button>}
      />
    );

    expect(screen.getByText('Editar Produto A')).toBeInTheDocument();
    expect(screen.getByText('Editar Produto B')).toBeInTheDocument();
  });
});

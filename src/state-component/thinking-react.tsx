import { filter } from "fp-ts/lib/ReadonlyNonEmptyArray";
import React from "react";

class ProductCategoryRow extends React.Component<
  { category: string | null },
  {}
> {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan={2}>{category}</th>
      </tr>
    );
  }
}
interface Product {
  name: string;
  stocked: boolean;
  price: string;
  category: string | null;
}

class ProductRow extends React.Component<{ product: Product }> {
  render() {
    const product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component<{
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}> {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows: JSX.Element[] = [];
    let lastCategory: string | null = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component<{
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onInStockOnlyChange: (inStockChange: boolean) => void;
}> {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => this.props.onFilterTextChange(e.target.value)}
        />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => this.props.onInStockOnlyChange(e.target.checked)}
          />{" "}
          Only show products in stock
        </p>
      </form>
    );
  }
}

export class FilterableProductTable extends React.Component<
  { products: Product[] },
  {
    filterText: string;
    inStockOnly: boolean;
  }
> {
  constructor(props: { products: Product[] }) {
    super(props);
    this.state = { filterText: "", inStockOnly: false };
  }

  handleFilterTextChange(filterText: string) {
    this.setState({ filterText });
  }

  handleInStockOnly(inStockOnly: boolean) {
    this.setState({ inStockOnly });
  }
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={(e: string) => this.handleFilterTextChange(e)}
          onInStockOnlyChange={(e: boolean) => this.handleInStockOnly(e)}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

export const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />,
//   document.getElementById("container")
// );

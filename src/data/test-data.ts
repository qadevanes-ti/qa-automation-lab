// Credenciais públicas de demonstração, publicadas pelo próprio SauceDemo.
export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  invalid: { username: 'invalid_user', password: 'wrong_password' },
} as const;

export const customer = {
  firstName: 'Pessoa',
  lastName: 'Teste',
  postalCode: '01001000',
} as const;

export type Product = { readonly name: string; readonly price: string };

export const backpack = {
  name: 'Sauce Labs Backpack',
  price: '$29.99',
  description:
    'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
} as const satisfies Product & { description: string };

export const bikeLight = { name: 'Sauce Labs Bike Light', price: '$9.99' } as const;

export const redShirt = {
  name: 'Test.allTheThings() T-Shirt (Red)',
  price: '$15.99',
} as const satisfies Product;

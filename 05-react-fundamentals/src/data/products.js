// Static catalog — deliberately NOT in Redux. It never changes at runtime,
// so it's plain data. Only *changing* shared state earns a slice.
export const products = [
  { id: 1, name: 'Split Mechanical Keyboard', tag: 'hardware', price: 149 },
  { id: 2, name: 'Trackball, Thumb-Operated', tag: 'hardware', price: 89 },
  { id: 3, name: 'Rubber Duck (Senior)', tag: 'debugging', price: 12 },
  { id: 4, name: 'Whiteboard Marker 12-Pack', tag: 'architecture', price: 18 },
  { id: 5, name: 'Standing Desk Crank', tag: 'ergonomics', price: 240 },
  { id: 6, name: 'Coffee, Single-Origin 1kg', tag: 'fuel', price: 32 },
]

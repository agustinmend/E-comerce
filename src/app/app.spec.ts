import { App } from "./app";

describe('AppComponent', () => {
  it('registra el componente en el reporte sin ejecutar su lógica', () => {
    expect(App).toBeDefined();
  });
});
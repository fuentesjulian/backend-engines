// uso la clase ProductosApi del template del profe
class ProductosApi {
  constructor() {
    this.productos = [];
    this.id = 0;
  }

  listar(id) {
    // busco por id, convierto a int el id con un parseInt por si la data llega en formato string
    const producto = this.productos.find((prod) => prod.id === parseInt(id));
    // si existe el producto devuelvo el producto
    if (producto) return producto;
    // por default devuelvo el json con el msj de producto no encontrado
    return { error: "producto no encontrado" };
  }

  listarAll() {
    // devuelvo todos los productos
    return this.productos;
  }

  guardar(prod) {
    // cuando recibo el objeto prod, convierto en float el precio (por si quiero ordenar x precio a futuro, para hacer cuentas, etc)
    prod.price = parseFloat(prod.price);
    // agrego el producto
    this.productos.push({ id: ++this.id, ...prod });
    // devuelvo el id (en server corro el listar(id))
    return this.id;
  }

  actualizar(prod, id) {
    // primero checkea que exista un producto con el id indicado, sino no puede actualizar
    if (this.productos.filter((prod) => prod.id != parseInt(id)).length === 0) return { error: "producto no encontrado" };
    // convierto a float el precio
    prod.price = parseFloat(prod.price);
    // actualizo con un map al objeto del array que tenga un id que coincida con el id que recibo como parametro
    this.productos = this.productos.map((producto) => {
      if (producto.id === parseInt(id)) return { id: parseInt(id), ...prod };
      // devuelvo el prod
      return producto;
    });
  }

  borrar(id) {
    // filtro al array de productos, quedan todos salvo el que tiene el id igual al recibido como parametro
    this.productos = this.productos.filter((prod) => prod.id != parseInt(id));
    // devuelvo el id eliminado
    return { idEliminado: id };
  }
}

module.exports = ProductosApi;

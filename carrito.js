/* =========================================
   MENU DIGITAL - CARRITO INDEPENDIENTE
========================================= */

(function () {

    // ALMACENAMIENTO EXCLUSIVO
    let productosCarrito = JSON.parse(
        localStorage.getItem("carritoMenuDigital")
    ) || [];


    // GUARDAR
    function guardarCarrito() {

        localStorage.setItem(
            "carritoMenuDigital",
            JSON.stringify(productosCarrito)
        );

    }


    // OBTENER PRODUCTOS
    function obtenerCarrito() {

        return productosCarrito;

    }


    // AGREGAR PRODUCTO
function agregarProducto(producto) {

    const cantidad = Number(producto.cantidad) || 1;

    const existente = productosCarrito.find(item =>
        item.nombre === producto.nombre
    );

    if (existente) {

        existente.cantidad += cantidad;

    } else {

        productosCarrito.push({
            nombre: producto.nombre,
            precio: Number(producto.precio),
            cantidad: cantidad
        });

    }

    guardarCarrito();
    actualizarContadorFlotante();

}

    // ELIMINAR PRODUCTO
    function eliminarProducto(indice) {

        productosCarrito.splice(indice, 1);

        guardarCarrito();
        actualizarContadorFlotante();

    }


    // ELIMINAR POR NOMBRE
    function eliminarProductoPorNombre(nombre) {

        productosCarrito = productosCarrito.filter(
            producto => producto.nombre !== nombre
        );

        guardarCarrito();
        actualizarContadorFlotante();

    }


    // AUMENTAR CANTIDAD
    function aumentarCantidad(indice) {

        if (!productosCarrito[indice]) return;

        productosCarrito[indice].cantidad++;

        guardarCarrito();
        actualizarContadorFlotante();

    }


    // DISMINUIR CANTIDAD
    function diminuirCantidad(indice) {

        if (!productosCarrito[indice]) return;

        productosCarrito[indice].cantidad--;

        if (productosCarrito[indice].cantidad <= 0) {
            productosCarrito.splice(indice, 1);
        }

        guardarCarrito();
        actualizarContadorFlotante();

    }


    // TOTAL DE PRODUCTOS
    function totalProductos() {

        return productosCarrito.reduce(
            (total, producto) =>
                total + Number(producto.cantidad || 0),
            0
        );

    }


    // TOTAL DE COMPRA
    function totalCompra() {

        return productosCarrito.reduce(
            (total, producto) =>
                total + Number(producto.precio) *
                Number(producto.cantidad),
            0
        );

    }


    // VACIAR CARRITO
    function vaciarCarrito() {

        productosCarrito = [];

        guardarCarrito();
        actualizarContadorFlotante();

    }


    // ACTUALIZAR CONTADOR
    function actualizarContadorFlotante() {

        const contador = document.getElementById("contador");

        if (contador) {
            contador.textContent = totalProductos();
        }

    }


    // FUNCIONES DISPONIBLES PARA INDEX Y CARRINHO
    window.guardarCarrito = guardarCarrito;
    window.obtenerCarrito = obtenerCarrito;
    window.agregarProducto = agregarProducto;
    window.eliminarProducto = eliminarProducto;
    window.eliminarProductoPorNombre = eliminarProductoPorNombre;
    window.aumentarCantidad = aumentarCantidad;
    window.diminuirCantidad = diminuirCantidad;
    window.totalProductos = totalProductos;
    window.totalCompra = totalCompra;
    window.vaciarCarrito = vaciarCarrito;
    window.actualizarContadorFlotante = actualizarContadorFlotante;

    document.addEventListener("DOMContentLoaded", function () {
        actualizarContadorFlotante();
    });

})();
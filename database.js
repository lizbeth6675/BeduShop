const mongoose = require("mongoose")

const db = 'BeduShop'
const dbUser = 'javiGN'
const dbPass = 'javiGN'

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.qrvngpz.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose.connect(uri);

const ProductoSchema = mongoose.Schema({
    nombre : {type: String, require: true},
    precio: Number,
    cat : {type : String, enum:['Alimentos', 'Bebidas', 'Otros']},
    desc : String
},{
    collection: "Productos",
    timestamps: true
})

const Producto = mongoose.model("Producto", ProductoSchema);

function obtenerProductos(){
    Producto.find()
    .then( data => console.log(data) )    
}

function crearProducto(producto){
    const prod = new Producto(producto);

    prod.save()
    .then(res => console.log(res))
}

const info = {
    nombre : "mesa",
    precio : 1500,
    cat : 'Otros',
    desc : "mesa con 4 patas",
    descuento : 20.0
}

// crearProducto(info);
// obtenerProductos();

function obtenerProdPorPrecio(precio){
    const query = {
        'precio': {
          '$lte': precio
        }
    }
    Producto.find(query)
    .then( data => console.log(data) )
}

// obtenerProdPorPrecio(100);

function agregacion(precio){
    const agr = [
        {
          '$project': {
            'nombre': 1, 
            'precio': 1, 
            '_id': 0
          }
        }, {
          '$match': {
            'precio': {
              '$lte': precio
            }
          }
        }, {
          '$sort': {
            'precio': -1
          }
        }
    ]
    Producto.aggregate(agr)
    .then( data => console.log(data))
}
agregacion(900);
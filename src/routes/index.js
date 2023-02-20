const { Router } = require("express")
const router = Router()
const { db } = require('../firebase')

router.get('/pelicula', async (req, res) => {
    try {

        const peliculas = await db.collection('pelicula').get()
        const datos = peliculas.docs.map((movie) => {
            return {
                id: movie.id,
                ...movie.data()
            }
        })
        res.send(datos)
    }
    catch (err) {
        res.send('Ocurrio un error inesperado')
    }
})

router.get('/actor', async (req, res) => {
    try {

        const actores = await db.collection('actor').get()
        const datos = actores.docs.map((actor) => {
            return {
                id: actor.id,
                ...actor.data()
            }
        })
        res.send(datos)
    }
    catch (err) {
        res.send('Ocurrio un error inesperado')
    }
})

router.get('/pelicula/:id', async (req, res) => {
    try {
        const id = req.params.id
        const datos = await db.collection('pelicula').doc(id).get()
        if (datos) {
            res.send({
              id: datos.id,
              ...datos.data(),
             
            })
          } else {
            res.send('Ocurrio un error inesperado')
          }
    }
    catch (err) {
        res.send('Ocurrio un error inesperado')
    }
})

router.get('/actor/:id', async (req, res) => {
    try {
        const id = req.params.id
        const datos = await db.collection('actor').doc(id).get()
        if (datos) {
            res.send({
              id: datos.id,
              ...datos.data(),
             
            })
          } else {
            res.send('Ocurrio un error inesperado')
          }
    }
    catch (err) {
        res.send('Ocurrio un error inesperado')
    }
})

router.post('/pelicula', async (req, res) => {
    const body = req.body
    await db.collection('pelicula').add({
        nombre: body.nombre,
        duracion: body.duracion,
        director: body.director,
        sinopsis: body.sinopsis,
        actores: body.actores,
        img_url: body.img_url
    })
    res.send(body)
})

router.put('/pelicula/:id', async (req, res) => {
    const id = req.params.id
    await db.collection('pelicula').doc(id).update(req.body)
    res.send('Modificado')
})

router.delete('/pelicula/:id', async (req, res) => {
    const id = req.params.id
    await db.collection('pelicula').doc(id).delete()
    res.send('Eliminado')
})

module.exports = router
import Firebase from '../firebase/firebase'


// variable a la base de datos 
const PaperDb=Firebase.db.collection("paper")
const Etiquetas=Firebase.db.collection("etiquetas")
// actualizar paper

                const actualizarPaper=(paper)=>
                {
                // actualizando el paper etiquetas 
                // actulizando paper
                    PaperDb.doc(paper.id).update(paper).then(()=>{
                        console.log("paper actualizado")
                    }).catch(error=>console.log("error al actualizar"))

                }

                // Actualizar paper


                const ActualizarPaperEnEtiquetas=(paper)=>{
                    console.log(paper)
                    let tag=paper.etiquetas
                    console.log(tag)
                    tag.map(valor=>{
                        Etiquetas.doc(valor.id).collection("paper").doc(paper.id).update(paper).then(()=>{
                            console.log("paper actualizado")
                        }).catch(error=>console.log("error al actualizar"))
                    })


                }

                const actualizarVariosPaper =(lista)=>{

                    lista.map(doc=>{
                         actualizarPaper(doc)

                    })

                }
                const  ActualizarVariosEtiquetas=async(lista,valor)=>{

                        



                        
                        console.log(lista)

                        lista.map(doc=>{
  
                                
                                doc.etiquetas.map(tag=>{

                                    Etiquetas.doc(tag.id).collection("paper").doc(doc.id).update(doc).then(()=>{
                                        console.log("paper actualizado")
                                        }).catch(error=>console.log("error al actualizar"))   
                                })                                        
                                    })
                }


            

                







export  {actualizarPaper,ActualizarPaperEnEtiquetas,actualizarVariosPaper,ActualizarVariosEtiquetas}


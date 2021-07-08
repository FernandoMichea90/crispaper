
import Firebase from '../firebase/firebase'


// retorna el paper por id
const RetornarPaper=async(id)=>{

   const consulta= await Firebase.db.collection("paper").doc(id).get().then(docRef=>{return{id:docRef.id,...docRef.data()}})
   console.log(consulta)
   return consulta

}

// renovar papers  segun el mapeo de etiquetas 

const RenovarPaperMapEtiqueta=(paper)=>{
    console.log("hola mundo")
    console.log(paper)
    const etiquetas=paper.etiquetas
    const consulta=Firebase.db.collection("etiquetas")

    etiquetas.map(tag=>{

         consulta.doc(tag.id).collection("paper").doc(paper.id).update(paper)


    })



}








export {RetornarPaper,RenovarPaperMapEtiqueta}
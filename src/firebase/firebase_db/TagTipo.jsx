import firebase from "../firebase";

const TagTipoDB = firebase.db.collection("TagTipo");

// Crear un nuevo elemento en la colección
export const crearTagTipoDb = async (Tagtipo) => {
  try {
    await TagTipoDB.add(Tagtipo);
    return {
      status: 1,
      message: "Su información se ha guardado con éxito",
    };
  } catch (err) {
    return {
      status: 0,
      message: err.message,
    };
  }
};

// Listar todos los elementos en la colección
export const listarTagTiposDb = async () => {
  try {
    const querySnapshot = await TagTipoDB.get();
    const tagTipos = [];
    querySnapshot.forEach((doc) => {
      tagTipos.push({ id: doc.id, ...doc.data() });
    });
    return {
      status: 1,
      data: tagTipos,
    };
  } catch (err) {
    return {
      status: 0,
      message: err.message,
    };
  }
};

// Editar un elemento en la colección por su ID
export const editarTagTipoDb = async (id, nuevoTagTipo) => {
  try {
    await TagTipoDB.doc(id).update(nuevoTagTipo);
    return {
      status: 1,
      message: "La información se ha actualizado con éxito",
    };
  } catch (err) {
    return {
      status: 0,
      message: err.message,
    };
  }
};

// Borrar un elemento en la colección por su ID
export const borrarTagTipoDb = async (id) => {
  try {
    await TagTipoDB.doc(id).delete();
    return {
      status: 1,
      message: "La información se ha eliminado con éxito",
    };
  } catch (err) {
    return {
      status: 0,
      message: err.message,
    };
  }
};

// Lista Paginada
export const listarTagTipoPaginada = async (pageSize, startAfter = null) => {
    try {
      let query = TagTipoDB.orderBy("nombre"); // Ordena por el campo deseado
  
      if (startAfter) {
        query = query.startAfter(startAfter);
      }
  
      query = query.limit(pageSize);
  
      const querySnapshot = await query.get();
      const tagTipos = [];
      querySnapshot.forEach((doc) => {
        tagTipos.push({ id: doc.id, ...doc.data() });
      });
  
      return {
        status: 1,
        data: tagTipos,
      };
    } catch (err) {
      return {
        status: 0,
        message: err.message,
      };
    }
}

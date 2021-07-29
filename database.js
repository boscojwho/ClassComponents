import PouchDB from 'pouchdb-react-native';

export const localDB = new PouchDB('items');

export const getAllItems = (callback) =>  {
  localDB.allDocs({ include_docs: true, descending: false }, (err, doc) => {
    if (!err) {
      const allItems = doc.rows.map(item => item.doc);

      console.log('fetched items');
      console.log(allItems);
      callback(allItems);
      return
    } else {
      console.log('failed to fetch items');
      callback([]);
      return
    }
  })
}

export const getItem = (itemId, callback) => {
  localDB.get(itemId, (err, doc) => {
    if (!err) {
      callback(doc);
    } else {
      console.log(err);
      return
    }
  })
}

/// Pass in doc with updated values, and this function will update this doc's latest rev with those values.
export const updateDoc = (docToUpdate, callback) => {
  localDB.get(docToUpdate._id, (err, doc) => {
    if (!err) {
      /// Replace caller's doc with latest rev.
      docToUpdate._rev = doc._rev
      console.log('doc to update')
      console.log(docToUpdate)
      localDB.put(docToUpdate, (err, response) => {
        if (!err) {
          callback(doc)
        } else {
          callback(err)
        }
      })
    } else {
      console('update doc error')
      console.log(err);
      return
    }
  })
}
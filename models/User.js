const { ObjectId } = require('mongodb');

class User {
  constructor(db) {
    this.collection = db.collection('users');
  }

  async create(userData) {
    const result = await this.collection.insertOne({
      ...userData,
      createdAt: new Date()
    });
    return result;
  }

  async findByEmail(email) {
    return await this.collection.findOne({ email });
  }

  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, updateData) {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
  }
}

module.exports = User;

const { ObjectId } = require('mongodb');

class Vehicle {
  constructor(db) {
    this.collection = db.collection('vehicles');
  }

  async create(vehicleData) {
    const result = await this.collection.insertOne({
      ...vehicleData,
      createdAt: new Date()
    });
    return result;
  }

  async findAll() {
    return await this.collection.find({}).toArray();
  }

  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByUserId(userId) {
    return await this.collection.find({ userId }).toArray();
  }

  async update(id, updateData) {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
  }

  async delete(id) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Vehicle;

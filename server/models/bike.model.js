import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
    brand: { 
        type: String, 
        required: true 
    },
    model: { 
        type: String, 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    fuel_type: { 
        type: String, 
        required: true 
    },
    transmission: { 
        type: String, 
        required: true 
    },
    seating_capacity: { 
        type: Number, 
        required: true 
    },
    pricePerDay: { 
        type: Number, 
        required: true 
    }, 
    image: { 
        type: String, 
        required: true 
    },
    isAvailable: { 
        type: Boolean, 
        default: true 
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    description: { 
        type: String 
    }
}, { timestamps: true });

export const Bike = mongoose.model("Bike", bikeSchema);
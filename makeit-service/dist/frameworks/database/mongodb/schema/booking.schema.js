import { Schema } from 'mongoose';
export const bookingSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'client'
    },
    date: [{
            type: Date,
            required: true
        }],
    paymentStatus: {
        type: String,
        enum: ["Pending", "Failed", "Successfull", "Refunded"],
        default: "Pending"
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'service'
    },
    vendorApproval: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: 'Pending'
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'vendors'
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    rejectionReason: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Rejected', 'Completed'],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isComplete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
//# sourceMappingURL=booking.schema.js.map
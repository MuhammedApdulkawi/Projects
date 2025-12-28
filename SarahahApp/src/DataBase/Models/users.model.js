import mongoose, { set } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First Name must be at least 3 characters"],
            maxLength: 20,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            minLength: [3, "Last Name must be at least 3 characters"],
            maxLength: 20,
            trim: true
        },
        age: {
            type: Number,
            required: true,
            min: [18, "Age must be at least 18 years"],
            index: {
                name: "idx_age_index",
            }
        },
        email: {
            type: String,
            required: true,
            index: {
                name: "idx_email_unique",
                unique: true,
                trim: true
            }
        },
        password: {
            type: String,
            required: true,
            minLength: [6, "Password must be at least 6 characters"]
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"],
            default: "male"
        },
        phoneNumber: {
            type: String, 
            required: true
        }
    }, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    virtuals: {
        fullName: {
            get() {
                return `${this.firstName} ${this.lastName}`;
            }
        }
    }
});

userSchema.index({ firstName: 1, lastName: 1 }, { name: "idx_firstName_lastName", unique: true });



export default mongoose.model("User", userSchema);
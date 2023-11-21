const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['staff', 'student', 'admin'],
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    isSuspended: {
        type: Boolean,
        default: false
    },
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket"
        }
    ],
})

// hook to hash password before storing and changing role
userSchema.pre("save", async function(next){
    try{
        if(this.isModified("password")){
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
            
            return next();
        }

        return next();
    } catch(err){
        return next(err);
    }
});

// function to check if password is correct
userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);

        return isMatch;
    } catch(err){
        return next(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
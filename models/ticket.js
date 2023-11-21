const mongoose = require("mongoose");
const User = require("./user");

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})


// hook to delete ticket
ticketSchema.pre("remove", async function(next){
    try{
        // remove ticket from user ticket list
        const user = await User.findById(this.user);                    
        await user.ticket.remove(this.id);
        await user.save();

        return next();
    } catch(err){
        return next(err);
    }
})

ticketSchema.pre('deleteMany', async function (next) {
    try {
        const deletedTicket = await ticket.find(this._conditions).lean()

        for(const b of deletedTicket){

            // remove this ticket from user ticket list
            const user = await User.findById(b.user);
            await user.ticket.remove(b._id);
            await user.save();
        }

        return next();
    } catch (error) {
      return next(error);
    }
});


const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
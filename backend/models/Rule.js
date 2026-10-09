const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema(

{

    title:{

        type:String,

        required:true,

        trim:true

    },

    description:{

        type:String,

        required:true,

        trim:true

    },

    category:{

        type:String,

        enum:[

            "General",

            "Security",

            "Parking",

            "Maintenance",

            "Community",

            "Pets",

            "Emergency",

            "Cleanliness"

        ],

        default:"General"

    },

    priority:{

        type:String,

        enum:[

            "Low",

            "Normal",

            "High"

        ],

        default:"Normal"

    },

    isPinned:{

        type:Boolean,

        default:false

    },

    isActive:{

        type:Boolean,

        default:true

    },

    createdBy:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User"

    }

},

{

    timestamps:true

}

);

module.exports=mongoose.model("Rule",ruleSchema);
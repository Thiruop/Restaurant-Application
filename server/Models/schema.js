import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    role: {
        type: String,
        default: "User"
    },
    password: {
        type: String,
        required: true
    },
    location: String,
    order_item: {
        type: [
            {
                username: String,
                dish_name: String,
                restaurant_name: String,
                price: Number,
                location: String
            }
        ],
        default: []
    },
    payment: {
        type: Number,
        default: 0
    },track_down: {
        type: Array,
        default: []},
    bucket_list: {
        type: [
            {
                restaurant_id: String,
                restaurant_name: String,
                dishes: [
                    {
                        dish_id: String,
                        dish_name: String,
                        dish_image: String,
                        dish_price: String
                    }
                ]
            }
        ],
        default: []
    },track_down:{
        type:String,
        default:"Order Received"
    }
});

const RestaurantSchema = new Schema({
    restaurant_id: String,
    restaurant_name: String,
    restaurant_image: String,
    location: String,
    ratings: String,
    votes: String,
    availability: {
        type: String,
        default: "open"
    },
    dishes: [
        {
            dish_id: String,
            dish_name: String,
            dish_image: String,
            dish_price: String,
            dish_detail: {
                ingredients: {
                    type: Array,
                    default: []
                },
                description: String
            }
        }
    ],
});

const RestaurantOwnerSchema = new Schema({
    role: {
        type: String,
        default: "Restaurant Owner"
    },
    name: String,
    password: String,
    email: String,
    restaurant_id: String,
    restaurant_name: String,
    location: String,
    availability: {
        type: String,
        default: "open"
    },
    issues:{ 
        type:[{
        name:String,
        restaurant_name:String,
        issue:String   
    }],
    default:[]
}

});

const AdminSchema = new Schema({
    role: {
        type: String,
        default: "Admin"
    },
    name: String,
    password: String,
    email: String,
    view_orders: {
        type: [
            {
                username: String,
                dish_name: String,
                restaurant_name: String,
                price: Number,
                location: String,
                order_status: {
                    type: String,
                    default: "pending"
                },track_down:{
                    type:String,
                    default:"Order Received"
                }
            }
        ],
        default: []
    },
    issues:{ 
        type:[{
        name:String,
        restaurant_name:String,
        issue:String   
    }],
    default:[]
}
});

const DeliveryPartnerSchema = new Schema({
    role: String,
    name: String,
    password: String,
    location: String,
    email:String,
    view_orders: {
        type: [
            {
                username: String,
                dish_name: String,
                restaurant_name: String,
                price: Number,
                location: String,
                order_status: {
                    type: String,
                    default: "pending"
                },track_down:{
                    type:String,
                    default:"Order Received"
                }
            }
        ],
        default: []
    }
});

const Partner = mongoose.model("Partner", DeliveryPartnerSchema);
const Admin = mongoose.model("Admin", AdminSchema);
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
const Member = mongoose.model("User", UserSchema);
const Owner = mongoose.model("RestaurantOwner", RestaurantOwnerSchema);

export { Restaurant, Admin, Member, Partner, Owner };

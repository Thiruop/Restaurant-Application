import {createJWT} from "../Utils/tokenUtil.js";
import { Restaurant, Admin, Member, Partner, Owner} from "../Models/schema.js";
import {hashPassword, comparePassword} from "../Utils/passwordUtil.js";
import { Types } from 'mongoose';
export const Login = async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user = await Member.findOne({email});
        if(!user){
            return res.status(401).send({message: "Invalid emailID"});
        }
        const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).send({message: "Invalid password"});
    }
    const token = createJWT({
      email: user.email,
      userId:user._id
    });
    res.status(200).send({token, message: "Login Succesfull!"});
    }catch(error){
        console.error("Error logging in:", error);
    res.status(500).json({message: "Internal server error"});
    }

}
export const Registration = async(req,res)=>{
    try{
        const {name,email,password,confirm_password,location}=req.body;
        const user = await Member.findOne({email});
        if(user){
            return res.status(400).send({message:"email is already exists"});

        }
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await Member.create({
            name,
            email,
            password: hashedPassword,
            location
            
          });
          const token = createJWT({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            location:newUser.location
          });
          console.log(token);
    res.status(200).json({token, message: "User registered successfully"});

    }catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({message: "Internal server error"})

    }
    
}
export const Worker = async(req,res)=>{
    const {email,password,role}=req.body;
    if(role ==="Admin"){
        try {
       
            const user = await Admin.findOne({email}).select('-password');
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(200).json({ user });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: "Internal server error" });
        }

    }else if(role ==="delivery partner"){
        try {
       
            const user = await Partner.findOne({email}).select('-password');
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(200).json({ user });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: "Internal server error" });
        }

    }else if(role === "Restaurant Owner"){
        try {
       
            const user = await Owner.findOne({email}).select('-password');
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(200).json({ user });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: "Internal server error" });
        }
}
}

export const Main=async(req,res)=>{
    try{
        const New=await Restaurant.find({});
        if(New){
            res.json(New)
        }else{
            res.send("No Restaurant Availabe")
        }
    }catch(error){
        res.status(500).send(error.message);
    }

}
export const GetUser = async (req, res) => {
    try {
       
        const user = await Member.findOne({_id:req.userId}).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const UpdateUser =async(req,res)=>{
    const userId = req.params.id;
    const updataData = req.body;
    const updatedUser = await Member.findByIdAndUpdate(userId,updataData, { new: true });

        res.json(updatedUser);
}
export const UpdateOrder = async (req, res) => {
    try {
        const { email, order_item } = req.body;

        const user = await Member.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.order_item.push(...order_item);
        await user.save();
        const restaurantLocation = order_item[0].location; // Assuming the location is in the first order item
    const matchingDeliveryPartners = await Partner.find({ location: restaurantLocation });
    matchingDeliveryPartners.forEach(async (partner) => {
        partner.view_orders.push(...order_item);
        await partner.save();
    })

        res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const BucketList = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Member.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user.bucket_list)

        res.status(200).json({ bucketList: user.bucket_list });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const ClearBucketList = async (req, res) => {
    try {
      const userId = req.userId;
  
      const user = await Member.findByIdAndUpdate(
        userId,
        { $set: { bucket_list: [] } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Bucket list cleared successfully", user });
    } catch (error) {
      console.error("Error clearing bucket list:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  export const RemoveDishBucketList = async (req, res) => {
    try {
      const userId = req.userId; 
      const { dishName } = req.params; 
      console.log(dishName)
      
      const user = await Member.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const indexToRemove = user.bucket_list.findIndex(item => item.dishes.some(dish => dish.dish_name === dishName));
  
      if (indexToRemove === -1) {
        return res.status(404).json({ message: "Item not found in the bucket list" });
      }
  
      // Log dish name of the item to be removed
      console.log("Dish name to remove:", dishName);
      user.bucket_list.splice(indexToRemove, 1);
      await user.save();
  
      res.status(200).json({ message: "Item removed from the bucket list successfully", user });
    } catch (error) {
      console.error("Error removing item from bucket list:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
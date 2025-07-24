import connectDB from "@/config/database";
import Property from "@/models/propertyModel";

const propertiesList = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();
  return properties;
};

const recentpropertiesList = async () => {
  await connectDB();
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  return recentProperties;
};

const propertyDetails = async (id) => {
  await connectDB();
  const propertyDetail = await Property.findById(id).lean();
  return propertyDetail;
};

export { propertiesList, recentpropertiesList, propertyDetails };

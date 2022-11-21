// Components
import BuyerSearchCard from "../../../cards/BuyerSearchCard";

const SearchListItem = ({ value, searchQuery, item, navigation }) => {
  if (value === "Farmers") {
    if (searchQuery === "") {
      return (
        <BuyerSearchCard key={item._id} item={item} navigation={navigation} />
      );
    } else if (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return (
        <BuyerSearchCard key={item._id} item={item} navigation={navigation} />
      );
    }
  } else {
    if (searchQuery === "") {
      return (
        <BuyerSearchCard
          key={item._id}
          item={item}
          location="search"
          navigation={navigation}
        />
      );
    } else if (
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return (
        <BuyerSearchCard
          key={item._id}
          item={item}
          location="search"
          navigation={navigation}
        />
      );
    }
  }
};

export default SearchListItem;

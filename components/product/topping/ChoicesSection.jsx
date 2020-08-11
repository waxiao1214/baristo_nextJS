/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedToppings } from '../../../store/actions/cart.actions';
import ToppingCard from './ToppingCard';

const ChoicesSection = ({ choiceGroup }) => {
  const dispatch = useDispatch();
  const { id: groupId, choiceItems, customerMustSelectChoice, minSelection, maxSelection } = choiceGroup;
  const { selectedProductChoices } = useSelector(state => state.cart);

  const boundSetSelectedToppings = (toppings) => dispatch(setSelectedToppings(toppings));

  const isChoiceAdded = (choice) => {
    let alreadyAdded = false;
    selectedProductChoices.forEach((selectedChoice) => {
      if (selectedChoice.id === choice.id) {
        alreadyAdded = true;
      }
    });
    return alreadyAdded
  }

  const handleAddClick = (choice) => {
    const alreadyAdded = isChoiceAdded(choice);
    if (!alreadyAdded) {
      choice.quantity = 1;
      choice.choiceGroupId = groupId;
      boundSetSelectedToppings(selectedProductChoices.concat([choice]));
    }
  }

  const handleRemoveClick = (choice) => {
    boundSetSelectedToppings(selectedProductChoices.filter(selectedChoice => selectedChoice.id !== choice.id))
  }

  return (
    <div className="row">
      {choiceItems.map((choiceItem) => {
        return (
          <div key={choiceItem.id} className="col-md-6 col-6">
            <ToppingCard
              topping={choiceItem}
              onAdd={() => handleAddClick(choiceItem)}
              onRemove={() => handleRemoveClick(choiceItem)}
              isSelected={isChoiceAdded(choiceItem)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChoicesSection;

/* eslint-disable no-param-reassign */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setSelectedToppings } from '../../../store/actions/cart.actions';
import ToppingCard from './ToppingCard';

const ChoicesSection = ({ choiceGroup }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['common']);
  const { id: groupId, choiceItems, customerMustSelectChoice, minSelection, maxSelection } = choiceGroup;
  const { selectedProductChoices } = useSelector(state => state.cart);

  const [errorMessage, setErrorMessage] = useState('');
  const showErrorMessage = (message) => {
    setErrorMessage(message);
    // setTimeout(() => {
    //   setErrorMessage('');
    // }, 5000);
  }

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

  const validate = () => {
    let isValid = false;
    // customer needs to select at least one item
    if (customerMustSelectChoice) {
      selectedProductChoices.forEach((selectedChoice) => {
        choiceItems.forEach(choiceItem => {
          if (selectedChoice.id === choiceItem.id) {
            isValid = true;
          }
        })
      })
      if (!isValid) {
        showErrorMessage(t('select_at_least_one_choice'));
        return isValid;
      };
    }

    let totalSelected = 0;
    selectedProductChoices.forEach((selectedChoice) => {
      choiceItems.forEach(choiceItem => {
        if (selectedChoice.id === choiceItem.id) {
          totalSelected += 1;
        }
      })
    })
    if (minSelection > totalSelected) {
      isValid = false;
      showErrorMessage(`${t('select_at_least')} ${minSelection}`);
      return isValid;
    }
    if (maxSelection < totalSelected) {
      isValid = false;
      showErrorMessage(`${t('select_at_max')} ${maxSelection}`);
      return isValid;
    }

    showErrorMessage('');
    return isValid;
  }

  useEffect(() => {
    validate();
  }, [selectedProductChoices])

  return (
    <div className="row">
      {errorMessage !== '' &&
        <div className="col-12">
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        </div>
      }
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

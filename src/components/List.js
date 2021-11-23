import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "../css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Card, Tabs, Table, Button } from 'antd';
import { IconButton } from "@material-ui/core";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getCafeData } from "../Redux/Action/DetailsAction";
// import { Button } from "@mui/material";

const List = () => {
    const dispatch = useDispatch();
    const { cafeDetails } = useSelector(state => state.details);
    const id = [];
    const [state, setState] = useState();
   
    useEffect(() => {
        dispatch(getCafeData());
    }, [])

    const { TabPane } = Tabs;

    const columns = [
        {
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span>
                    <span className="name">{record.name}<br /></span>
                    <span>{record.dish_price}{record.currency}<br /></span>
                    <span className="greyText">{record.dish_description}</span><br />
                    <Button className="button_grp">
                        <span className="minus" onClick={() => {minus(record)}}>-</span><span className="zero">{state}</span><span className="plus" onClick= {() => plus(record)}>+</span>
                    </Button><br/>
                    <span className="redText">{record.dish_Availability}</span>
                </span>
            )
        },
        {
            dataIndex: 'calorie',
            key: 'calorie',
        },
        {
            dataIndex: 'image',
            key: 'image',
        },
    ];

    const minus = (id) => {
            setState(state-1);
    }

    const plus = (id) => {
       setState(state+1);
    }

    const callback = (cat_id) => {
        let dishList = [];
        let cat_list = cafeDetails[0] && cafeDetails[0].table_menu_list.filter((item) => item.menu_category_id === cat_id)
        console.log("state",cat_list);
        cat_list[0] && cat_list[0].category_dishes.map((item) => {
            dishList.push({
                name: item.dish_name,
                currency: item.dish_currency,
                dish_price: item.dish_price,
                dish_description: item.dish_description,
                calorie: item.dish_calories + " Calorie",
                cartValue: state,
                dish_Availability: item.dish_Availability === true ? "customization available" : "Not available",
                image: <img src={item.dish_image} style={{ width: '70px', height: '70px' }} />,
                menu_category_id: cat_list[0].menu_category_id,
            })
        })
        return dishList;
    }

    return (
        <Card
            title="UNI Resto Cafe"
            extra={
                <h3>My Orders
                    <IconButton>
                        <ShoppingCartIcon></ShoppingCartIcon>
                        <label className="cartValue">{state}</label>
                    </IconButton>
                </h3>
            }>
            <Tabs defaultActiveKey="1" >
                {cafeDetails[0] && cafeDetails[0].table_menu_list && cafeDetails[0].table_menu_list.map((item, key) => {
                    return (
                        <TabPane tab={item.menu_category} key={item.menu_category_id} onChange={callback(item.menu_category_id)}>
                            <Table columns={columns} dataSource={callback(item.menu_category_id)} />
                        </TabPane>
                    )
                })}
            </Tabs>
        </Card>
    );
}

export default List;

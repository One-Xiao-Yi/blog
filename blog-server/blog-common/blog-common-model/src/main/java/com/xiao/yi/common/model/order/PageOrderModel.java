package com.xiao.yi.common.model.order;

import com.xiao.yi.common.model.page.PageModel;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class PageOrderModel extends PageModel {

    private String orderFields;

    private String orderType;

    @Override
    public void clearParam() {
        super.clearParam();
        orderFields = null;
        orderType = null;
    }

    public String getOrderFields() {
        return orderFields;
    }

    public void setOrderFields(String orderFields) {
        this.orderFields = orderFields;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }
}

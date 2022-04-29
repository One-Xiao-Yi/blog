package reponse;

import page.PageModel;

import java.util.List;

/**
 * @author xiaoyi
 * @since 2022-04-14
 * 统一响应数据结构
 */
public class ResponseModel<T> extends PageModel {

    private T data;

    private List<T> rows;

    private String msg;

    private Boolean success;

    public static <T> ResponseModel<T> success(T data){
        ResponseModel<T> responseModel = success();
        responseModel.data = data;
        return responseModel;
    }

    public static <T> ResponseModel<T> success(List<T> rows){
        ResponseModel<T> responseModel = success();
        responseModel.rows = rows;
        return responseModel;
    }

    public static <T> ResponseModel<T> error(Exception e){
        ResponseModel<T> responseModel = new ResponseModel<>();
        responseModel.msg = e.getMessage();
        responseModel.success = false;
        return responseModel;
    }

    public static <T> ResponseModel<T> error(String msg){
        ResponseModel<T> responseModel = new ResponseModel<>();
        responseModel.msg = msg;
        responseModel.success = false;
        return responseModel;
    }

    public static <T> ResponseModel<T> success() {
        ResponseModel<T> responseModel = new ResponseModel<>();
        responseModel.success = true;
        responseModel.msg = "ok";
        return responseModel;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }
}

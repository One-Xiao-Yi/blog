package page;

import com.github.pagehelper.Page;

import java.util.List;

public class PageModel {

    private Integer current;

    private Integer pageSize;

    private Long total;

    public Integer getCurrent() {
        return current;
    }

    public boolean pageCheck(){
        return null != current && null != pageSize;
    }

    public void setCurrent(Integer current) {
        this.current = current;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}

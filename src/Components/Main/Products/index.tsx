import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Table, TableBody, TableRow, TableCell, TablePagination, TableHead, Button, Fab } from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { 
    Products as productRedux,
    ProductsFilter ,
    ProductsParams , 
    Filter as Filterer,
    NavigationTitle,
    
} from 'Redux/Actions';
import { withRouter } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import './ProductsStyle.scss';
import { Close, CloudUpload, FilterList, ViewColumn, Cached } from '@material-ui/icons';
import moment from 'moment';
import { Requests } from '../../../Services';
import { useSnackbar } from 'notistack';
import Filter from './Filter';
import Add from './Add';
import Show from './Show';
import Edit from './Edit';
import TableOrder from './TableOrder';
import Upload from 'Components/Upload';

const Products = (props:any) =>{

    const productsRequest:any = React.useRef();
    const initErrroMessage = {
        id                          : {error:false,message:''},
        supplier                    : {error:false,message:''},
        product                     : {error:false,message:''},
        delivery_date               : {error:false,message:''},
        reference_delivery_document : {error:false,message:''},
        serial_number               : {error:false,message:''},
        warranty                    : {error:false,message:''},
        warranty_start              : {error:false,message:''},
        status                      : {error:false,message:''},
        remarks                     : {error:false,message:''},
    };
    
    const initProductInput = {
        id                  : '',
        supplier            : '',
        product             : '',
        delivery_date       : '',
        reference_delivery_document : '',
        serial_number       : '',
        warranty            : '',
        warranty_start      : '',
        status              : '',
        remarks             : '',
    
    }

    const initFilter = {
        supplier            : {filter:'iet',key:''},
        product             : {filter:'iet',key:''},
        product_description : {filter:'iet',key:''},
        supplier_name       : {filter:'iet',key:''},
        category            : {filter:'iet',key:''},
        serial_number       : {filter:'iet',key:''},
        warranty            : {filter:'iet',key:''},
        warranty_start      : {filter:'iet',key:''},
        warranty_end        : {filter:'iet',key:''},
        status              : {filter:'iet',key:''},
        delivery_date       : {filter:'iet',key:''},
        reference_delivery_document : {filter:'iet',key:''},
        created_by          : {filter:'iet',key:''},
        remarks             : {filter:'iet',key:''},
    }
    // const initParams = {page     : 1,per_page : 10}


    // const [ params, setParams ] = React.useState(initParams);
    const [ modalEdit, setModalEdit ] = React.useState(false);  // for showing edit modal
    const [ modalShow, setModalShow ] = React.useState(false);
    const [ modalAdd, setModalAdd ] = React.useState(false);    
    const [ product, setProduct ] = React.useState(null);   // for holding product info by id
    const [ submit, setSubmit ] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar(); //snackbar
    const [ upload,setUpload ] = React.useState(false);
    const [filter, setFilter] = React.useState(initFilter);
    const [ productCodeParam, setProductCodeParam ] = React.useState();
    const [tableAnchor,setTableAnchor] = React.useState<HTMLButtonElement | null>(null);
    const [tableOpen, setTableOpen] = React.useState(false);


   
    let file:HTMLInputElement;

    const [ productInput, setProductInput ] = React.useState(initProductInput);
    const [responseMessage, setResponseMessage] = React.useState(initErrroMessage);
    const supplierState =  useSelector ( (state:any) => state.Suppliers.data );
    const user  = useSelector( (state:any) => state.UserAccount.data);
    // const filterSwitch = useSelector( (state:any) => state.Products.filter);
    const dispatch = useDispatch();


    const products =  useSelector( (state:any) => state.Products);

    useEffect(()=>{
    
        dispatch(NavigationTitle({control:'products'}));    
        window.addEventListener('scroll', scroll, true);
        return () =>{
            window.removeEventListener('scroll', scroll);
        }
    },[props]);

    const scroll = () => {
        let scrollY = window.scrollY;
        let selector:any = window.document.getElementsByClassName('sticky-header');
        const changeAll = (style:string) => {
            for(var i = 0;i<selector.length;i++){
                
                if(style !== '0px'){
                    selector[i].style.background = '#3f50b5';
                    selector[i].style.color = 'white';
                }else{
                    selector[i].style.background = 'white';
                    selector[i].style.color = 'unset';
                }
                selector[i].style.top = style;
            }
        }
        if(scrollY > 92){
            changeAll(scrollY - 92 + 'px');
        }else{
            changeAll('0px');
        }
    }

    const actions = (key:any) => (
        <Button onClick={() => { closeSnackbar(key) }}>
            <div style={{color:"white"}}><Close /></div>
        </Button>
    );
    
    
    const resetError = () =>{
        setResponseMessage(initErrroMessage);
    };

    
    
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,newPage: number,) =>{
        let pams:any = products.params;
        pams.page=newPage+1;
        dispatch(ProductsParams(pams));
        dispatch(Filterer(filter,"product",pams));
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val:any = event.target.value;
        let paran = {page:1,per_page:val};
        dispatch(ProductsParams(paran));
        dispatch(Filterer(filter,"product",paran))
    };

    const uploadFile = () => {
        togglePointerEvents(false);
        if(file.files.length !== 0){
            const selectedFile = file.files[0];
            let filename = selectedFile.name.split('.').pop();
            
            if( !(filename === 'xls' || filename === 'xlsx')) {
                enqueueSnackbar('Please select xlsx or xls file only !!!. ',{variant:'error',action:actions});
                togglePointerEvents(true);
                return;
            }else{
                // uploadSheet(selectedFile);
            }
        }
    }

    const skeletonTable = () => {

        let a:any = [];
        const tableCell:any = [];
        let counter=0;
        
        Object.keys(products.table).forEach((value:any)=>{
            if(products.table[value].show){
                counter=counter+1;
                tableCell.push(<TableCell key={counter} align="right"><Skeleton variant="rect" width={'100%'} height={20} /></TableCell>)
            }
        })
        
        for(let i = 0;i < 10;i++ ){
            a.push(
                <TableRow key={i}>
                    {tableCell}
                </TableRow>
            );
        }

        return a;
    }

    const togglePointerEvents = (event:boolean) => {
        if(event){
            document.getElementsByTagName("html")[0].style.pointerEvents = "unset";
            document.getElementsByTagName("html")[0].style.cursor = "unset";
        }else{
            document.getElementsByTagName("html")[0].style.pointerEvents = "none";
            document.getElementsByTagName("html")[0].style.cursor = "progress";
        }
        return;
    }

    const initModalAdd = () => {
        
        const today  = new Date();
        setProductInput({
            ...initProductInput,
            delivery_date       : moment(today).format('MM/DD/YYYY'),
            warranty_start     : moment(today).format('MM/DD/YYYY'),
        });

        resetError();
        setModalAdd(true);
    }

    const initModalShow = (productInfo:any) =>{
        setProduct(productInfo);
        setModalShow(true);
    }

    const updateInput = (event:any, value?:any) => {

        if(event){
            if(event instanceof Date){
                setProductInput({
                    ...productInput,
                    [value] : moment(event).format('MM/DD/YYYY'),
                })
            }else{
                setProductInput({
                    ...productInput,
                    [event.target.name] : event.target.value,
                })
            }
        }
    }


    const initModalEdit = () =>{

        resetError();

        setProductInput({
            id                          : product.id,
            supplier                    : product.supplier.id,
            product                     : product.product.id,
            delivery_date               : product.delivery_date,
            reference_delivery_document : product.reference_delivery_document,
            serial_number               : product.serial_number,
            warranty                    : product.warranty,
            warranty_start              : product.warranty_start,
            status                      : product.status,
            remarks                     : product.remarks,
        });

        setModalShow(false);
        setModalEdit(true);
    }


    type action = "edit" | "add-file" | "add";
    const submitForm = async (event:any, action:action) => {

        resetError();
        event.persist(); 
        event.preventDefault();
        togglePointerEvents(false);
        setSubmit(true);

        switch(action){
            case "edit" :
                await productsRequest.current.update(productInput).then( 
                    (response:any) =>{
                        if(response.status === 200 && !response.data.hasOwnProperty('status')){
                            enqueueSnackbar('Product successfully updated!!!',{variant:'success',action:actions});
                            setModalEdit(false);
                            dispatch(productRedux());
                        }
                        if(response.status === 200 && response.data.hasOwnProperty('status')){
                            enqueueSnackbar('Update product failed!!',{variant:'error',action:actions});
                            updateErrorState(response.data.errors);
                        }
                    }   
                )

                break;
            case "add" :
                await productsRequest.current.add(productInput).then( 
                    (response:any) =>{
                        if(response.status === 200 && !response.data.hasOwnProperty('status')){
                            enqueueSnackbar('Product successfully added!!!',{variant:'success',action:actions});
                            setModalAdd(false);
                            dispatch(productRedux());
                        }else{
                            enqueueSnackbar('Add new product failed!!',{variant:'error',action:actions});
                            updateErrorState(response.data.errors);
                        }
                    }
                )
                break;
        }
        
        setSubmit(false);
        togglePointerEvents(true);
        return;
    }


    const status = (stat:any) => {
        switch(stat){
            case 1 : 
                return "New";
            case 2 :
                return "Replaced";
            case 3 : 
                return "Returned";
            case 4 :
                return "Repaired";
        }
    }


    const handleSort = (name:string) => {

        let tables = products.table;

        // Object.keys(products.table).forEach((values:any)=>{
            

        //     if(values === name){
        //         if(products.table[name].asc === null || products.table[name].asc === false){

        //             tables[name].asc=true;
        //         }else{
        //             tables[name].asc=false;
        //         }
        //     }else{
        //         tables[name].asc=null;
        //     }

        //     console.log(tables[name].asc,name);
        // });

        // console.log(tables[name]);


        console.error('To be continued');
    }

    const updateErrorState = (response:[]) => {
        let holder:any = initErrroMessage;
        response.forEach( (value:any) =>{
            holder[value.name] = {error : true,message: value.message};
        });
        
        setResponseMessage(holder);
    }


    return(
        <React.Fragment>
            <Requests.Products request={productsRequest} />
            <TableOrder open={tableOpen} setOpen={setTableOpen} anchor={tableAnchor} />

            <Edit
                modalEdit       = {modalEdit}
                updateInput     = {updateInput}
                submit          = {submit}
                responseMessage = {responseMessage}
                productInput    = {productInput}
                product         = {product}
                submitForm      = {submitForm}
                setModalEdit    = {setModalEdit}
                params          = {productCodeParam}
            />
            <Add 
                modalAdd        = {modalAdd}
                setModalAdd     = {setModalAdd}
                updateInput     = {updateInput}
                productInput    = {productInput}
                submit          = {submit}
                responseMessage = {responseMessage}
                supplierState   = {supplierState}
                submitForm      = {submitForm}
                setProductInput = {setProductInput}
                params          = {productCodeParam}
            />
            <Show 
                product       = {product}
                modalShow     = {modalShow}
                user          = {user}
                initModalEdit = {initModalEdit}
                setModalShow  = {setModalShow}
            />
            <Upload
                open      = {upload}
                setOpen   = {setUpload}
                type      = "product"
            />
            
            {/* {uploadFileModal()} */}
            <Paper className="paper-table main-content">
                <div className="header">
                    <div className="title">Products</div>
                    <div className="controls">
                        <Fab size="small" disabled={products.status!=="done"} className={products.status === "done" ? "rotate pause":"rotate" } onClick={()=>dispatch(productRedux())} color="primary" >
                            <Cached />
                        </Fab>
                        <Fab size="small" color="primary" onClick={()=>{
                                dispatch(ProductsFilter(!products.filter));
                                setFilter(initFilter);
                            }} >
                            <FilterList />
                        </Fab>
                        <Fab size="small" color="primary" onClick={(event:any)=>{
                            setTableAnchor(event.currentTarget);
                            setTableOpen(!tableOpen);
                        }}>
                            <ViewColumn />
                        </Fab>
                    </div>
                </div>
                <div className="custom-table">
                    <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={()=>handleSort("supplier_code")} className={products.table.supplier_code.asc !== null ? "sticky-header pointer selected-columns" : "sticky-header pointer"} align="center" hidden={!products.table.supplier_code.show}>Supplier Code</TableCell>
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.supplier_name.show}>Supplier Name</TableCell>
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.product_code.show}>Product Code</TableCell>
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.product_name.show}>Product Name</TableCell>
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.category.show}>Category</TableCell>
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.serial.show}>Serial Number</TableCell>
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.warranty.show}>Warranty</TableCell>
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.warranty_start.show}>Warranty Start</TableCell>
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.warranty_end.show}>End Date</TableCell>
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.status.show}>Status</TableCell> 
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.delivery_date.show}>Delivery Date</TableCell> 
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.reference_delivery_document.show}>Delivery Document</TableCell> 
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.created_by.show}>Created By</TableCell> 
                            <TableCell className="sticky-header pointer" align="left" hidden={!products.table.remarks.show}>Remarks</TableCell> 
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        <Filter filter={filter} setFilter={setFilter} />
                        {
                            products.data ?
                                products.data.data.data.map((key:any,id:number)=>(
                                    <TableRow key={id}  hover={true} className="pointer" onDoubleClick={() => initModalShow(key)} >
                                        <TableCell align="left"     title={key.supplier.supplier_code}                          hidden={!products.table.supplier_code.show} >{key.supplier.supplier_code}</TableCell>
                                        <TableCell align="left"     title={key.supplier.supplier_name}                          hidden={!products.table.supplier_name.show} >{key.supplier.supplier_name}</TableCell>
                                        <TableCell align="left"     title={key.product.product_code}                            hidden={!products.table.product_code.show} >{key.product.product_code}</TableCell>
                                        <TableCell align="left"     title={key.product.product_name}                            hidden={!products.table.product_name.show} >{key.product.product_name}</TableCell>
                                        <TableCell align="left"     title={key.product.category.name}                           hidden={!products.table.category.show} >{key.product.category.name}</TableCell>
                                        <TableCell align="left"     title={key.serial_number}                                   hidden={!products.table.serial.show} >{key.serial_number}</TableCell>
                                        <TableCell align="left"     title={key.warranty}                                        hidden={!products.table.warranty.show} >{key.warranty}</TableCell>
                                        <TableCell align="left"     title={moment(new Date(key.warranty_start)).format("ll")}   hidden={!products.table.warranty_start.show} >{moment(new Date(key.warranty_start)).format("ll")}</TableCell>
                                        <TableCell align="left"     title={moment(new Date(key.warranty_end)).format("ll")}     hidden={!products.table.warranty_end.show} >{moment(new Date(key.warranty_end)).format("ll")}</TableCell>
                                        <TableCell align="left"     title={status(key.status)}                                  hidden={!products.table.status.show} >{status(key.status)}</TableCell>
                                        <TableCell align="left"     title={moment(new Date(key.delivery_date)).format("ll")}    hidden={!products.table.delivery_date.show} >{moment(new Date(key.delivery_date)).format("ll")}</TableCell>
                                        <TableCell align="left"     title={key.reference_delivery_document}                     hidden={!products.table.reference_delivery_document.show} >{key.reference_delivery_document}</TableCell>
                                        <TableCell align="left"     title={key.created_by.first_name+" "+key.created_by.last_name}                           hidden={!products.table.created_by.show} >{key.created_by.first_name+" "+key.created_by.last_name}</TableCell>
                                        <TableCell align="left"     title={key.remarks}                                         hidden={!products.table.remarks.show} >{key.remarks}</TableCell>
                                    </TableRow>
                                ))
                            :   skeletonTable()
                        }
                    </TableBody>
                </Table>
                </div>

                <div className="footer">
                    { 
                        user.level !== 3 ?
                            <React.Fragment>
                                <Button onClick={ () =>initModalAdd()} variant="contained" color="primary" className="product-add-new">
                                    ADD NEW
                                </Button>    
                                        
                                {/* <input type="file" hidden name="xlsx_upload" accept=".xlsx" ref={input => file=input } onChange={uploadFile}/> */}
                                <Button 
                                    color="primary"
                                    variant="contained"
                                    onClick={()=>{
                                        // event.persist();
                                        // file.click()
                                        setUpload(true);
                                    }}
                                    className = "product-add-file"
                                >
                                    <CloudUpload />&nbsp;  
                                    Import file
                                    </Button>
                            </React.Fragment>
                        : ''
                    }
                    
                    <TablePagination
                        rowsPerPageOptions={[10,25,50,100]}
                        colSpan={0}
                        component="div"
                        count={products.data ? products.data.data.meta.total : 10}
                        rowsPerPage={products.params.per_page}
                        page={products.data ? products.params.page-1: 0}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={(handleChangeRowsPerPage)}
                        ActionsComponent={TablePaginationActions}
                        className="custom-pagination"
                    />
                </div>
            </Paper>
        </React.Fragment>
    );
}

export default withRouter(Products);
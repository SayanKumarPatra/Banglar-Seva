import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc
} from "firebase/firestore";
import { db } from "./firebase.ts";
import { 
  Scheme, 
  Job, 
  Scholarship, 
  ServiceItem, 
  INITIAL_SCHEMES, 
  INITIAL_JOBS, 
  INITIAL_SCHOLARSHIPS, 
  SERVICES_DATA 
} from "../data.ts";

/**
 * Universal error handler conforming to FirestoreErrorInfo rules
 */
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// ----------------------------------------------------
// SCHEMES SERVICES
// ----------------------------------------------------

export async function fetchSchemes(): Promise<Scheme[]> {
  const colPath = "schemes";
  try {
    const querySnapshot = await getDocs(collection(db, colPath));
    const list: Scheme[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as Scheme);
    });

    if (list.length === 0) {
      // If empty on the live backend, automatically seed with initial dataset
      console.log("Seeding schemes into live database...");
      for (const item of INITIAL_SCHEMES) {
        const itemWithLogo: Scheme = { ...item, logoUrl: item.logoUrl || "" };
        await setDoc(doc(db, colPath, item.id), itemWithLogo);
        list.push(itemWithLogo);
      }
    }
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, colPath);
    return INITIAL_SCHEMES;
  }
}

export async function saveScheme(scheme: Scheme): Promise<void> {
  const colPath = "schemes";
  try {
    const docRef = doc(db, colPath, scheme.id);
    await setDoc(docRef, scheme);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${colPath}/${scheme.id}`);
  }
}

// ----------------------------------------------------
// JOBS SERVICES
// ----------------------------------------------------

export async function fetchJobs(): Promise<Job[]> {
  const colPath = "jobs";
  try {
    const querySnapshot = await getDocs(collection(db, colPath));
    const list: Job[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as Job);
    });

    if (list.length === 0) {
      console.log("Seeding jobs into live database...");
      for (const item of INITIAL_JOBS) {
        const itemWithLogo: Job = { ...item, logoUrl: item.logoUrl || "" };
        await setDoc(doc(db, colPath, item.id), itemWithLogo);
        list.push(itemWithLogo);
      }
    }
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, colPath);
    return INITIAL_JOBS;
  }
}

export async function saveJob(job: Job): Promise<void> {
  const colPath = "jobs";
  try {
    const docRef = doc(db, colPath, job.id);
    await setDoc(docRef, job);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${colPath}/${job.id}`);
  }
}

// ----------------------------------------------------
// SCHOLARSHIPS SERVICES
// ----------------------------------------------------

export async function fetchScholarships(): Promise<Scholarship[]> {
  const colPath = "scholarships";
  try {
    const querySnapshot = await getDocs(collection(db, colPath));
    const list: Scholarship[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as Scholarship);
    });

    if (list.length === 0) {
      console.log("Seeding scholarships into live database...");
      for (const item of INITIAL_SCHOLARSHIPS) {
        const itemWithLogo: Scholarship = { ...item, logoUrl: "" };
        await setDoc(doc(db, colPath, item.id), itemWithLogo);
        list.push(itemWithLogo);
      }
    }
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, colPath);
    return INITIAL_SCHOLARSHIPS;
  }
}

export async function saveScholarship(scholarship: Scholarship): Promise<void> {
  const colPath = "scholarships";
  try {
    const docRef = doc(db, colPath, scholarship.id);
    await setDoc(docRef, scholarship);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${colPath}/${scholarship.id}`);
  }
}

// ----------------------------------------------------
// DIGITAL SERVICES SERVICES
// ----------------------------------------------------

export async function fetchServices(): Promise<ServiceItem[]> {
  const colPath = "services";
  try {
    const querySnapshot = await getDocs(collection(db, colPath));
    const list: ServiceItem[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as ServiceItem);
    });

    if (list.length === 0) {
      console.log("Seeding digital services into live database...");
      for (const item of SERVICES_DATA) {
        const itemWithLogo: ServiceItem = { ...item, logoUrl: "" };
        await setDoc(doc(db, colPath, item.id), itemWithLogo);
        list.push(itemWithLogo);
      }
    }
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, colPath);
    return SERVICES_DATA;
  }
}

export async function saveService(service: ServiceItem): Promise<void> {
  const colPath = "services";
  try {
    const docRef = doc(db, colPath, service.id);
    await setDoc(docRef, service);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${colPath}/${service.id}`);
  }
}

export async function deleteScheme(id: string): Promise<void> {
  const colPath = "schemes";
  try {
    await deleteDoc(doc(db, colPath, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${colPath}/${id}`);
  }
}

export async function deleteJob(id: string): Promise<void> {
  const colPath = "jobs";
  try {
    await deleteDoc(doc(db, colPath, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${colPath}/${id}`);
  }
}

export async function deleteScholarship(id: string): Promise<void> {
  const colPath = "scholarships";
  try {
    await deleteDoc(doc(db, colPath, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${colPath}/${id}`);
  }
}

export async function deleteService(id: string): Promise<void> {
  const colPath = "services";
  try {
    await deleteDoc(doc(db, colPath, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${colPath}/${id}`);
  }
}
